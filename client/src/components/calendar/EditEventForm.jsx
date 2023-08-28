import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { EVENT_TYPE } from "../../../../utils/constants";
import moment from "moment";
import FormRowRadio from "../FormRowRadioEdit";
import Wrapper from "../../assets/wrappers/FormModal";

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
    try {
      await customFetch.delete(`/events/${eventId}`);
      toast.success("Event deleted successfully");
      onCloseModal();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" onSubmit={handleSubmit}>
        <h4 className="title">Edit Event</h4>
        <h3 className="date-title">
          {selectedDate && selectedDate.format("DD. MMM YYYY")}
        </h3>
        {/* Event Type Select */}
        <FormRowRadio
          name="eventType"
          options={eventTypeOptions}
          defaultValue={selectedEventType}
          handleChange={(eventType) => setSelectedEventType(eventType)}
        />
        {/* Hidden input field for event date */}
        <input type="hidden" name="eventDate" value={eventDate} />
        <div className="btn-container">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditEventForm;
