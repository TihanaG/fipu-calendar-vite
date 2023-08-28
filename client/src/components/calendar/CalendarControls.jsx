import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarControlsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 992px) {
    display: flex;
  }
`;

const CalendarControlsStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20px;
  font-size: 20px;
  gap: 1rem;

  h4 {
    margin: 0;
  }

  .left,
  .right {
    cursor: pointer;
    color: rgb(170, 170, 170);
  }

  @media (hover: hover) {
    .left:hover,
    .right:hover {
      color: var(--grey-500);
    }
  }

  .prev-btn,
  .next-btn {
    width: 40px;
    height: 40px;
    background: var(--white);
    border: 1px solid var(--primary-500);
    border-radius: 50%;
    color: var(--primary-500);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }

  .today-btn {
    background: var(--white);
    color: var(--grey-500);
    border: transparent;
    border-radius: var(--border-radius);
    //font-size: 16px;
    font-size: var(--small-text);
    padding: 0.375rem 0.75rem;
    transition: var(--transition);
    box-shadow: var(--shadow-2);
    cursor: pointer;
  }

  @media (hover: hover) {
    .today-btn:hover {
      background: var(--grey-50);
      // color: var(--text-color);
    }
  }
`;

const CalendarControls = ({
  currentMonthMoment,
  decrementMonth,
  incrementMonth,
  setToday,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <CalendarControlsWrap>
      <CalendarControlsStyled>
        <h4>
          {isMobile
            ? currentMonthMoment.format("MMM YYYY")
            : currentMonthMoment.format("MMMM YYYY")}
        </h4>
        <FaChevronLeft className="left" onClick={decrementMonth} />
        <FaChevronRight className="right" onClick={incrementMonth} />
        <button className="today-btn" onClick={setToday}>
          This month
        </button>
      </CalendarControlsStyled>
    </CalendarControlsWrap>
  );
};

export default CalendarControls;
