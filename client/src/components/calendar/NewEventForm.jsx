import Wrapper from "../../assets/wrappers/FormModal";
import React, { useState } from "react";
import { EVENT_TYPE } from "../../../../utils/constants";
import { Form } from "react-router-dom";
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

const NewEventForm = ({ selectedDate, handleSubmit, isSubmitting }) => {
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPE.RAD);
  return (
    <Wrapper>
      <Form method="post" onSubmit={handleSubmit}>
        <h4 className="title">Add Event</h4>
        <h3 className="date-title">{selectedDate && selectedDate.format("DD. MMM YYYY")}</h3>
        {/* Hidden input field for selectedDate */}
        <input
          type="hidden"
          name="eventDate"
          value={selectedDate && selectedDate.format("YYYY-MM-DD")}
        />
        <FormRowRadio
          name="eventType"
          options={eventTypeOptions}
          defaultValue={selectedEventType}
        />
        <button type="submit" name="intent" value="add" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default NewEventForm;
