//import Wrapper from "../../assets/wrappers/NewEventForm";
import React from "react";
import { EVENT_TYPE } from "../../../../utils/constants";
import { Form } from "react-router-dom";

const NewEventForm = ({ selectedDate, onSubmit, isSubmitting }) => {
  return (
    <Form method="post" onSubmit={onSubmit}>
      <h4>Add Event</h4>
      <h3>{selectedDate && selectedDate.format("DD. MMM YYYY")}</h3>
      {/* Hidden input field for selectedDate */}
      <input
        type="hidden"
        name="eventDate"
        value={selectedDate && selectedDate.format("YYYY-MM-DD")}
      />
      <div>
        <label htmlFor="eventType">Event Type</label>
        <select name="eventType" id="eventType" defaultValue={EVENT_TYPE.RAD}>
          {Object.values(EVENT_TYPE).map((itemValue) => {
            return (
              <option key={itemValue} value={itemValue}>
                {itemValue}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </Form>
  );
};

export default NewEventForm;
