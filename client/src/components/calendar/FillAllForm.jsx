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

const FillAllForm = ({ daysWithoutEvents, handleSubmit, isSubmitting }) => {
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPE.RAD);
  const formattedEventDates = daysWithoutEvents.join(",");
  return (
    <Wrapper>
      <Form method="post" onSubmit={handleSubmit}>
        <h4 className="title">Fill in the remaining days</h4>
        <input
          type="hidden"
          name="daysWithoutEvents"
          value={formattedEventDates}
          readOnly
        />
        <FormRowRadio
          name="eventType"
          options={eventTypeOptions}
          defaultValue={selectedEventType}
        />
        <button
          type="submit"
          name="intent"
          value="add-all"
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default FillAllForm;
