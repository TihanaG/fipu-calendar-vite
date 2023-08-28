import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { EVENT_TYPE } from "../../../../utils/constants";
import moment from "moment";
import FormRowRadio from "../FormRowRadio";

const eventTypeLabels = {
  rad: "Rad",
  rad_od_kuce: "Rad od kuće",
  bolovanje: "Bolovanje",
  sluzbeni_put: "Službeni put",
  godisnji: "Godišnji",
};

const eventTypeOptions = Object.keys(EVENT_TYPE).map((eventTypeKey) => {
  const eventTypeValue = EVENT_TYPE[eventTypeKey];
  return { value: eventTypeValue, label: eventTypeLabels[eventTypeValue] };
});

const EditEventForm = ({ eventId, eventName, eventDate, onCloseModal }) => {
  const [selectedDate, setSelectedDate] = useState(moment(eventDate));
  const [selectedEventType, setSelectedEventType] = useState(eventName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const updatedEvent = {
      //id: eventId,
      eventType: selectedEventType,
      eventDate: eventDate,
    };

    console.log("Updated Event:", updatedEvent);

    try {
      await customFetch.patch(`/events/${eventId}`, updatedEvent);
      toast.success("Event updated successfully");
      onCloseModal();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setIsSubmitting(false); // End form submission
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmed) {
      try {
        await customFetch.delete(`/events/${eventId}`);
        toast.success("Event deleted successfully");
        onCloseModal();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h4>Edit Event</h4>
      <h3>{selectedDate && selectedDate.format("DD. MMM YYYY")}</h3>
      {/* Event Type Select */}
      <div>
        <label htmlFor="eventType">Event Type</label>
        <select
          id="eventType"
          name="eventType"
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
        >
          {Object.values(EVENT_TYPE).map((itemValue) => (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          ))}
        </select>
      </div>
      {/* Hidden input field for event date */}
      <input type="hidden" name="eventDate" value={eventDate} />
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update"}
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </Form>
  );
};

export default EditEventForm;
