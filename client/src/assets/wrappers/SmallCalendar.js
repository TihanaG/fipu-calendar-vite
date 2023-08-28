import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .calendar-controls-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .calendar-controls {
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 1rem;
    }

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
    // font-size: 16px;
    font-size: var(--small-text);
    padding: 0.375rem 0.75rem;
    transition: var(--transition);
    box-shadow: var(--shadow-2);
    cursor: pointer;
  }

  .calendar-table {
    height: 60dvh;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .calendar-row {
    display: flex;
    flex: 1;
  }

  .calendar-heading {
    display: flex;
    flex-direction: row;
  }
  .calendar-heading-cell {
    flex: 1;
    text-align: center;
  }
  .calendar-cell-wrap {
    padding: 0px;
    flex: 1;
    pointer-events: ${(props) =>
    props.isSunday || props.isSaturday || !props.isCurrentMonth
      ? "none;"
      : "auto;"};
    background-color: ${(props) =>
    props.isSunday || props.isSaturday ? "none;" : "var(--white);"};
  }
`;

export default Wrapper;
