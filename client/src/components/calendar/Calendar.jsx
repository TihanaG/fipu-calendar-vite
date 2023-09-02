import moment from "moment";
import {
  daysOfTheWeek,
  getDaysForWeeksInMonth,
  segmentIntoWeeks,
} from "../../utils/util";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const CalendarControlsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h4 {
    width: 5rem;
  }
  @media (min-width: 840px) {
    h4 {
      width: 6rem;
    }
  }
  @media (min-width: 900px) {
    h4 {
      width: 8rem;
    }
  }
  @media (min-width: 1024px) {
    h4 {
      width: 14rem;
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .add-events {
    display: flex;
    align-items: end;
  }
  .add-events-btn {
    background: var(--primary-500);
    color: var(--white);
    border: transparent;
    border-radius: var(--borderRadius);
    font-size: 16px;
    padding: 0.375rem 0.75rem;
    transition: var(--transition);
    box-shadow: var(--shadow-2);
    cursor: pointer;
  }

  .add-events-btn:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
`;

const CalendarControls = styled.div`
  display: flex;
  align-items: center;
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
    // font-size: 16px;
    font-size: var(--small-text);
    padding: 0.375rem 0.75rem;
    transition: var(--transition);
    box-shadow: var(--shadow-2);
    cursor: pointer;
  }

  @media (hover: hover) {
    .today-btn:hover {
      background: var(--grey-50);
      // background: #eee;
      // color: var(--text-color);
    }
  }
`;

const CalendarTableWrap = styled.div``;

const CalendarTable = styled.div`
  height: 60dvh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CalendarRow = styled.div`
  display: flex;
  flex: 1;
`;

const CalendarHeading = styled.div`
  display: flex;
  flex-direction: row;
`;

const CalendarHeadingCell = styled.div`
  flex: 1;
  text-align: center;
`;

const CalendarCellWrap = styled.div`
  padding: 0px;
  flex: 1;
  // ${(props) => props.isSunday && "pointer-events: none;"}
  pointer-events: ${(props) =>
    props.isSunday || props.isSaturday || !props.isCurrentMonth
      ? "none;"
      : "auto;"};
  background-color: ${(props) =>
    props.isSunday || props.isSaturday ? "none;" : "var(--white);"};
`;

/*const Cell = styled.div`
  // background-color: var(--white);
  background-color: ${props => (props.isSunday || props.isSaturday) ? '#eee;' : 'var(--white);'};
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  height: 100%;
  padding-left: 5px;
  cursor: pointer;
  transition: var(--transition);

  :hover {
    background-color: #eee;
  }
`;*/

// month, year instead currentMonthMoment kako bi bilo reusable
export const Calendar = ({
  onCellClicked,
  month,
  year,
  onPrev,
  onNext,
  setToday,
  getCellProps,
  cellComponent: CellComponent,
  // showAddButton = false,
}) => {
  // ovo je vezano za propse u Calendar
  const currentMonthMoment = moment(`${month}${year}`, "MMYYYY");

  const weeks = segmentIntoWeeks(getDaysForWeeksInMonth(currentMonthMoment));

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
    <>
      <CalendarTableWrap>
        <CalendarControlsWrap>
          <CalendarControls>
            <h4>
              {isMobile
                ? currentMonthMoment.format("MMM YYYY")
                : currentMonthMoment.format("MMMM YYYY")}
            </h4>
            <div className="btn-container">
              <FaChevronLeft className="left" onClick={onPrev} />
              <FaChevronRight className="right" onClick={onNext} />
              <button className="today-btn" onClick={setToday}>
                Today
              </button>
            </div>
          </CalendarControls>
        </CalendarControlsWrap>

        <CalendarTable>
          <CalendarHeading>
            {daysOfTheWeek.map((day) => (
              <CalendarHeadingCell key={day}>{day}</CalendarHeadingCell>
            ))}
          </CalendarHeading>
          {weeks.map((week, i) => {
            return (
              <CalendarRow key={i}>
                {week.map((dayMoment, j) => {
                  const isSunday = dayMoment.format("dddd") === "Sunday";
                  const isSaturday = dayMoment.format("dddd") === "Saturday";
                  const isCurrentMonth = dayMoment.isSame(
                    currentMonthMoment,
                    "month"
                  );
                  return (
                    <CalendarCellWrap
                      isSunday={isSunday}
                      isSaturday={isSaturday}
                      isCurrentMonth={isCurrentMonth}
                      key={dayMoment.format("DD/MM/YYYY")}
                      onClick={() =>
                        !isSunday &&
                        isCurrentMonth &&
                        onCellClicked(
                          dayMoment.format("DD"),
                          dayMoment.format("MM"),
                          dayMoment.format("YYYY")
                        )
                      }
                    >
                      <CellComponent
                        isSunday={isSunday}
                        dateNumber={dayMoment.format("D")}
                        isInCurrentMonth={dayMoment.isSame(
                          currentMonthMoment,
                          "month"
                        )}
                        {...getCellProps(dayMoment)}
                      />
                    </CalendarCellWrap>
                  );
                })}
              </CalendarRow>
            );
          })}
        </CalendarTable>
      </CalendarTableWrap>
    </>
  );
};
