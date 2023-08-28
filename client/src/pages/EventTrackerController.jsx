import { useState } from "react";
import moment from "moment";
import { Calendar } from "../components/calendar/Calendar";
import { Modal } from "../components/calendar/Modal";
import { EventCell } from "../components/calendar/EventCell";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import NewEventForm from "../components/calendar/NewEventForm";
import { CalendarMenu } from "../components/calendar/CalendarMenu";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/events");
    return { data };
  } catch (error) {
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let intent = formData.get("intent");
  console.log(data);
  console.log("intent", intent);

  if (intent === "add") {
    try {
      const response = await customFetch.post("/events", data);
      console.log("Server Response:", response);
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  }

  if (intent === "add-all") {
    console.log("Add-all works");

    // Now convert formData to an object
    const data = Object.fromEntries(formData);

    // Log the entire FormData object
    console.log("form Data", data);

    try {
      const response = await customFetch.post("/events/all", data);
      console.log("Server Response:", response);
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  }
};

const EventTrackerController = () => {
  const { data } = useLoaderData();
  console.log(data);
  const { events } = data;
  console.log(events);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);

  const incrementMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment.add(1, "months")));
  };

  const decrementMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, "months")));
  };

  const setToday = () => {
    setCurrentMonthMoment(today);
  };

  const displayModal = (date, month, year) => {
    // console.log({ date, month, year })
    setSelectedDate(moment(`${date}${month}${year}`, "DDMMYYYY"));
    setShowNewEventModal(true);
  };

  const handleSubmit = () => {
    setShowNewEventModal(false);
  };

  const findDaysWithoutEvents = () => {
    const startDate = currentMonthMoment.clone().startOf("month");
    const endDate = currentMonthMoment.clone().endOf("month");

    const daysToAddEvents = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");

      // Check if the current day is not a weekend (Saturday or Sunday)
      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        // Check if an event already exists for the current date
        const eventsForDate = events.filter((event) =>
          moment(event.eventDate).isSame(formattedDate, "day")
        );

        if (eventsForDate.length === 0) {
          daysToAddEvents.push(formattedDate);
        }
      }

      currentDate.add(1, "day");
    }

    return daysToAddEvents;
  };

  return (
    <>
      <CalendarMenu
        findDaysWithoutEvents={findDaysWithoutEvents}
        isSubmitting={isSubmitting}
      />
      <Modal
        shouldShow={showNewEventModal}
        onRequestClose={() => setShowNewEventModal(false)}
      >
        <NewEventForm
          selectedDate={selectedDate}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit} // for Modal
        />
      </Modal>
      {/* events={events} in calendar is removed
            getCellProps instead */}
      <Calendar
        getCellProps={(dayMoment) => {
          const eventsForDay = events.filter((event) => {
            return moment(event.eventDate).isSame(dayMoment, "day");
          });
          return {
            //isSelected: selectedDates.some((selectedDate) =>
            //  selectedDate.isSame(dayMoment, "date")
            //),
            isToday: dayMoment.isSame(today, "day"),
            events: eventsForDay,
          };
        }}
        // onCellClicked={displayModal}
        onCellClicked={(date, month, year) => {
          const clickedMoment = moment(
            `${date}${month}${year}`,
            "DDMMYYYY"
          ).toDate();
          const isEventDate = events.some((event) =>
            moment(event.eventDate, "YYYY-MM-DD").isSame(clickedMoment, "day")
          );
          if (!isEventDate) {
            displayModal(date, month, year);
          }
        }}
        month={currentMonthMoment.format("MM")}
        year={currentMonthMoment.format("YYYY")}
        onPrev={decrementMonth}
        onNext={incrementMonth}
        setToday={setToday}
        cellComponent={EventCell}
      />
    </>
  );
};

export default EventTrackerController;
