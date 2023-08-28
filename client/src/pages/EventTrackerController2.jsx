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

  try {
    const response = await customFetch.post("/events", data);
    console.log("Server Response:", response);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const EventTrackerController = () => {
  const { data } = useLoaderData();
  console.log(data);
  const { events } = data;
  console.log(events);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysWithoutEvents, setDaysWithoutEvents] = useState([]);

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

      // Check if an event already exists for the current date
      const eventsForDate = events.filter((event) =>
        moment(event.eventDate).isSame(formattedDate, "day")
      );

      if (eventsForDate.length === 0) {
        daysToAddEvents.push(formattedDate);
      }

      currentDate.add(1, "day");
    }

    return daysToAddEvents;
  };

  const fillAll = async () => {
    try {
      const startDate = currentMonthMoment.clone().startOf("month");
      const endDate = currentMonthMoment.clone().endOf("month");

      const daysToAddEvents = [];
      let currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(endDate, "day")) {
        const formattedDate = currentDate.format("YYYY-MM-DD");

        // Check if an event already exists for the current date
        const eventsForDate = events.filter((event) =>
          moment(event.eventDate).isSame(formattedDate, "day")
        );

        if (eventsForDate.length === 0) {
          daysToAddEvents.push(formattedDate);
        }

        currentDate.add(1, "day");
      }

      // Make an HTTP POST request to create events for the selected dates
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedDates: daysToAddEvents }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Events created:", data);
        // You might want to update the UI or refresh the data after events are created
      } else {
        console.error("Failed to create events");
      }
    } catch (error) {
      console.error("Error creating events:", error);
    }
  };

  return (
    <>
      <CalendarMenu fillAll={fillAll} findDaysWithoutEvents={findDaysWithoutEvents} />
      <Modal
        shouldShow={showNewEventModal}
        onRequestClose={() => setShowNewEventModal(false)}
      >
        <NewEventForm
          selectedDate={selectedDate}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
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
