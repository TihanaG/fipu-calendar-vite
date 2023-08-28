import styled from "styled-components";
import {
  BsCalendarCheck,
  BsCalendarWeek,
  BsCalendarEvent,
  BsCalendarPlus,
  BsCalendarX,
} from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { Modal } from "./Modal";
import { useState } from "react";
import FillAllForm from "./FillAllForm";

const CalendarMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 20px;

  .btn-calendar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    cursor: pointer;
    color: var(--grey-500);
    background: var(--white);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
  }
  .btn-calendar:hover {
    background: var(--grey-50);
    box-shadow: var(--shadow-3);
  }

  .add-btn {
    background: var(--primary-500);
    color: var(--white);
  }

  .add-btn:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
`;

export const CalendarMenu = ({
  fillAll,
  findDaysWithoutEvents,
  isSubmitting,
}) => {
  // console.log("CalendarMenu rendering");
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const daysWithoutEvents = findDaysWithoutEvents();

  const displayModal = () => {
    setShowNewEventModal(true);
  };

  const handleSubmit = () => {
    setShowNewEventModal(false);
  };

  const deleteAllEvents = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete all events here
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal
        shouldShow={showNewEventModal || showDeleteModal}
        onRequestClose={() => {
          setShowNewEventModal(false);
          setShowDeleteModal(false);
        }}
      >
        {showNewEventModal ? (
          <FillAllForm
            daysWithoutEvents={daysWithoutEvents}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        ) : (
          <div>
            <p>Are you sure you want to delete all events?</p>
            <button onClick={handleDeleteConfirm}>Yes, delete all</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        )}
      </Modal>
      <CalendarMenuContainer>
        <button type="button" className="btn-calendar" onClick={displayModal}>
          <BsCalendarCheck />
          Fill all
        </button>
        <button
          type="button"
          className="btn-calendar"
          onClick={deleteAllEvents}
        >
          <BsCalendarX />
          Delete all
        </button>
      </CalendarMenuContainer>
    </>
  );
};
