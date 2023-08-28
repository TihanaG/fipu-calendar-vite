import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { darken } from "polished";
import { Modal } from "./Modal";
import EditEventForm from "./EditEventForm";

const EventBox = styled.div`
  border-radius: 4px;
  color: #fff;
  padding: 4px 8px;
  font-size: var(--small-text);
  margin-bottom: 2px;
  cursor: pointer;

  background-color: ${({ eventColor }) => eventColor};

  :hover {
    background-color: ${({ eventColor }) => darken(0.1, eventColor)};
  }
`;

const optionsMapping = {
  rad: ["Rad", "R"],
  rad_od_kuce: ["Rad od kuće", "RK"],
  bolovanje: ["Bolovanje", "B"],
  sluzbeni_put: ["Službeni put", "SP"],
  godisnji: ["Godišnji", "G"],
};

const getColor = (name) => {
  // Define a mapping of colors based on the name value
  const colorMap = {
    rad: "#647acb",
    rad_od_kuce: "#a26ad6",
    bolovanje: "#d66a6a",
    sluzbeni_put: "#67b3d6",
    godisnji: "#e9b949",
    default: "#000000",
  };

  // Check if the name exists in the colorMap
  if (name.toLowerCase() in colorMap) {
    return colorMap[name.toLowerCase()];
  } else {
    // Use a default color if the name is not found in the colorMap
    return colorMap.default;
  }
};

export const Event = ({ id, name, date }) => {
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const displayName = isMobile
    ? optionsMapping[name][1]
    : optionsMapping[name][0];
  const eventColor = getColor(name);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setShowEditEventModal(true);
    console.log(`edit Event`);
  };

  const handleModalClose = () => {
    setShowEditEventModal(false);
  };

  return (
    <>
      <EventBox eventColor={eventColor} onClick={handleClick}>
        {displayName}
      </EventBox>
      <Modal shouldShow={showEditEventModal} onRequestClose={handleModalClose}>
        <EditEventForm
          eventId={id}
          eventName={name}
          eventDate={date}
          onCloseModal={handleModalClose}
        />
      </Modal>
    </>
  );
};
