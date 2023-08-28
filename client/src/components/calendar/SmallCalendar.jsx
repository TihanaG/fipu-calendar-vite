import moment from "moment";
import styled from "styled-components";
import {
  getDaysForWeeksInMonth,
  segmentIntoWeeks,
  shortDaysOfTheWeek,
} from "../../utils/util";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";

const CalendarTableWrap = styled.div`
  margin-top: 2rem;
  width: 19rem;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  margin-bottom: 2rem;
  padding: 2rem;
`;

const CalendarControlsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 1rem;
  .left,
  .right {
    cursor: pointer;
    color: rgb(170, 170, 170);
  }
  .clear-all-btn {
    cursor: pointer;
    color: rgb(170, 170, 170);
  }
  @media (hover: hover) {
    .left:hover,
    .right:hover,
    .clear-all-btn:hover {
      color: var(--grey-500);
    }
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
    }
  }
`;

const CalendarTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarRow = styled.div`
  display: flex;
  flex: 1;
`;

const CalendarHeading = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  color: rgb(170, 170, 170);
  //background: grey;
`;

const CalendarHeadingCell = styled.div`
  flex: 1;
  text-align: center;
  .cell {
    //height: 40px;
    //width: 40px;
    //background-color: red;
    margin-bottom: 0.5rem;
  }
`;

const CalendarCellWrap = styled.div`
  padding: 0px;
  flex: 1;
  //background: grey;
`;

export const SmallCalendar = ({
  onCellClicked,
  month,
  year,
  onPrev,
  onNext,
  getCellProps,
  cellComponent: CellComponent,
  clearAll,
}) => {
  const currentMonthMoment = moment(`${month}${year}`, "MMYYYY");

  const weeks = segmentIntoWeeks(getDaysForWeeksInMonth(currentMonthMoment));

  return (
    <CalendarTableWrap>
      <CalendarControlsWrap>
        <CalendarControls>
          <h5>{currentMonthMoment.format("MMM YYYY")}</h5>
          <FaChevronLeft className="left" onClick={onPrev} />
          <FaChevronRight className="right" onClick={onNext} />
          <MdClearAll className="clear-all-btn" onClick={clearAll} />
        </CalendarControls>
      </CalendarControlsWrap>
      <CalendarTable>
        <CalendarHeading>
          {shortDaysOfTheWeek.map((day, index) => (
            <CalendarHeadingCell key={index}>
              <div className="cell">{day}</div>
            </CalendarHeadingCell>
          ))}
        </CalendarHeading>
        {weeks.map((week, i) => {
          return (
            <CalendarRow key={i}>
              {week.map((dayMoment, j) => {
                return (
                  <CalendarCellWrap
                    key={dayMoment.format("MM/DD/YYYY")}
                    onClick={() =>
                      onCellClicked(
                        dayMoment.format("DD"),
                        dayMoment.format("MM"),
                        dayMoment.format("YYYY")
                      )
                    }
                  >
                    <CellComponent
                      dateNumber={dayMoment.format("D")}
                      isInCurrentMonth={dayMoment.isSame(
                        currentMonthMoment,
                        "month"
                      )}
                      {...getCellProps(
                        dayMoment.format("DD"),
                        dayMoment.format("MM"),
                        dayMoment.format("YYYY")
                      )}
                    />
                  </CalendarCellWrap>
                );
              })}
            </CalendarRow>
          );
        })}
      </CalendarTable>
    </CalendarTableWrap>
  );
};
