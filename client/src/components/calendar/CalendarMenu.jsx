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
import { Form } from "react-router-dom";

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

const ModalContainer = styled.div`
  p {
    margin: 1rem 0;
  }
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CalendarMenu = ({
  fillAll,
  findDaysWithoutEvents,
  isSubmitting,
  month,
  year,
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
          <ModalContainer>
            <p>Are you sure you want to delete all events in selected month?</p>
            <ConfirmButtonContainer>
              <Form
                method="post"
                action={`delete-events/${year}/${month}`}
                onSubmit={handleDeleteConfirm}
              >
                <button
                  type="submit"
                  className="btn"
                  name="intent"
                  value="delete-all"
                >
                  Yes, delete all
                </button>
              </Form>
              <button
                type="button"
                className="btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </ConfirmButtonContainer>
          </ModalContainer>
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
