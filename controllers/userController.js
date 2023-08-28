import { StatusCodes } from "http-status-codes";
import Event from "../models/Event.js";
import User from "../models/User.js";
import VacationRequest from "../models/VacationRequest.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getAllVacationRequests = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();
  const vacationRequest = await VacationRequest.countDocuments();

  try {
    const vacationRequests = await VacationRequest.find().populate('createdBy', 'name lastName')
    res.status(StatusCodes.OK).json({ vacationRequests });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred" });
  }
}

export const getApplicationReports = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();

  try {
    const { month, year } = req.query;

    let selectedYear, selectedMonth;

    if (!month || !year) {
      // If no month or year provided, use current month and year
      selectedYear = moment().year();
      selectedMonth = moment().month();
    } else {
      // Parse provided month and year
      selectedYear = parseInt(year);
      selectedMonth = parseInt(month) - 1;
    }

    const userReports = await User.aggregate([
      {
        $lookup: {
          from: "events",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$createdBy", "$$userId"] },
                    {
                      $gte: [
                        "$eventDate",
                        moment({ year: selectedYear, month: selectedMonth })
                          .startOf("month")
                          .toDate(),
                      ],
                    },
                    {
                      $lt: [
                        "$eventDate",
                        moment({ year: selectedYear, month: selectedMonth })
                          .endOf("month")
                          .toDate(),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "userEvents",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          userEvents: {
            $map: {
              input: "$userEvents",
              as: "event",
              in: {
                eventType: "$$event.eventType",
                eventDate: "$$event.eventDate",
                count: 1, // Count can be 1 because the event is present
              },
            },
          },
        },
      },
      {
        $sort: { name: 1 }, // Sort by name in ascending order
      },
    ]);

    res.status(StatusCodes.OK).json({ users, events, userReports });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred" });
  }
};


export const updateUser = async (req, res) => {
  // ne updateati password
  const obj = { ...req.body };
  delete obj.password;
  console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

export const getVacationRequest = async (req, res) => {
  const vacationRequest = await VacationRequest.findById(req.params.id).populate('createdBy', 'name lastName')
  res.status(StatusCodes.OK).json({ vacationRequest })
}

export const updateVacationRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVacationRequest = await VacationRequest.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(StatusCodes.OK).json({ msg: 'vacation request modified', vacationRequest: updatedVacationRequest });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred while updating the vacation request', error });
  }
};

export const createVacationEventsForSelectedDates = async (req, res) => {
  //createdBy
  //eventType="godisnji"
  //selectedDates=getDatesBetween

  const { createdBy, eventType, selectedDates } = req.body;
  console.log('Request Body:', req.body);

  //const event = await Event.create(req.body)
  //res.status(StatusCodes.CREATED).json({ event })

  /*
  try {
    const { createdBy, eventType, selectedDates } = req.body;
    console.log('Request Body:', req.body);

    const createdEvents = await Event.insertMany(
      selectedDates.map(eventDate => ({
        createdBy: createdBy,
        eventType: eventType,
        eventDate: eventDate,
      }))
    );

    res.status(StatusCodes.CREATED).json({ createdEvents });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
  */
}

