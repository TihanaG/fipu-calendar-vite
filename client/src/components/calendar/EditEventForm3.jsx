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
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPE.RAD)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <h4>Edit Event</h4>
      <h3>{selectedDate && selectedDate.format("DD. MMM YYYY")}</h3>
      {/* Event Type Select */}
      <FormRowRadio
        name="eventType"
        options={eventTypeOptions}
        defaultValue={selectedEventType}
      />
      {/* Hidden input field for event date */}
      <input type="hidden" name="eventDate" value={eventDate} />
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update"}
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </Form>
  );
};

export default EditEventForm;
