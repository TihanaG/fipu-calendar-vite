import 'express-async-errors'
import Event from '../models/Event.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import moment from 'moment'

export const getAllEvents = async (req, res) => {
    // console.log(req.user);
    const events = await Event.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ events })
}

export const createEvent = async (req, res) => {
    req.body.createdBy = req.user.userId
    console.log("req.body my log", req.body);
    const event = await Event.create(req.body)
    res.status(StatusCodes.CREATED).json({ event })
}

export const createEvents = async (req, res) => {
    const { daysWithoutEvents, eventType } = req.body;

    const eventDates = daysWithoutEvents.split(",");

    try {
        const createdEvents = await Promise.all(
            eventDates.map(async (eventDate) => {
                const newEvent = {
                    eventDate,
                    eventType,
                    createdBy: req.user.userId,
                };
                return await Event.create(newEvent);
            })
        );

        res.status(StatusCodes.CREATED).json({ events: createdEvents });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Failed to create events." });
    }
};


export const createEventsForSelectedDates = async (req, res) => {
    try {
        const { selectedDates } = req.body;
        const userId = req.user.userId;
        const createdEvents = [];
        for (const eventDate of selectedDates) {
            const event = await Event.create({
                ...req.body,
                createdBy: userId,
                eventDate,
            });
            createdEvents.push(event);
        }
        res.status(StatusCodes.CREATED).json({ createdEvents });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

export const getEvent = async (req, res) => {
    const event = await Event.findById(req.params.id)
    res.status(StatusCodes.OK).json({ event })
}

/*
export const updateEvent = async (req, res) => {
    // const { id } = req.params
    const updatedEvent = await Event.findOneAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(StatusCodes.OK).json({ msg: 'event modified', event: updatedEvent })
}
*/

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventType, eventDate } = req.body;

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: id }, // Use an object to specify the filter
            { eventType, eventDate }, // Updated data
            { new: true } // Return the updated event
        );

        if (!updatedEvent) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.status(StatusCodes.OK).json({ msg: 'Event modified', event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params
    const removedEvent = await Event.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({ msg: 'event deleted', event: removedEvent })
}

export const showReports = async (req, res) => {
    console.log("Raw query parameters:", req.query);
    const { month, year } = req.query;

    // Parse month and year as integers and check for valid values
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    // If month and year are not provided, use the current month and year
    const currentDate = moment();
    const currentMonth = parsedMonth || currentDate.month() + 1;
    const currentYear = parsedYear || currentDate.year();

    // Convert the selected month and year to a Moment.js object
    const selectedDate = moment({ year: currentYear, month: currentMonth - 1 });

    // Calculate the start and end of the selected month
    const startOfMonth = selectedDate.startOf('month').toDate();
    const endOfMonth = selectedDate.endOf('month').toDate();

    let reports = await Event.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
                eventDate: { $gte: startOfMonth, $lte: endOfMonth },
            },
        },
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
    ]);

    // Convert reports array to an object
    const defaultReports = reports.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    res.status(StatusCodes.OK).json({ defaultReports });
};
