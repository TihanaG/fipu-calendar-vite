import { useState } from "react";
import Wrapper from "../assets/wrappers/VacationRequest";
import { FormRow } from "../components";
import moment from "moment";
import { SmallCalendar } from "../components/calendar/SmallCalendar";
import { PillCell } from "../components/calendar/PillCell";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { VACATION_REQUEST_STATUS } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await customFetch.post("/vacation-requests", data);
    console.log("Server Response:", response);
    return redirect("/dashboard/my-requests");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const getDatesBetween = (startDate, endDate) => {
  let currentDate = startDate.clone();
  let dates = [];

  if (endDate.diff(startDate) > 0) {
    while (endDate.diff(currentDate) >= 0) {
      dates.push(currentDate.clone());
      currentDate.add(1, "days");
    }
  }
  return dates;
};

const VacationRequest = () => {
  const { user } = useOutletContext();

  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  const readOnly = true;
  const [vacationRequestDescription, setVacationRequestDescription] =
    useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const selectedDates =
    (selectedStartDate &&
      selectedEndDate &&
      getDatesBetween(selectedStartDate, selectedEndDate)) ||
    [];

  const [startDateInputIsActive, setStartDateInputIsActive] = useState(true);
  const [, /*endDateInputIsActive*/ setEndDateInputIsActive] = useState(false);

  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);

  const incrementMonth = () => {
    const newMonth = moment(currentMonthMoment.add(1, "months"));
    setCurrentMonthMoment(newMonth);
  };

  const decrementMonth = () => {
    const newMonth = moment(currentMonthMoment.subtract(1, "months"));
    setCurrentMonthMoment(newMonth);
  };

  const onDateSelected = (date, month, year) => {
    const selectedMoment = moment(`${date}${month}${year}`, "DDMMYYYY");
    if (startDateInputIsActive) {
      if ((selectedEndDate && selectedMoment.diff(selectedEndDate)) > 0) {
        setSelectedStartDate(selectedEndDate);
        setSelectedEndDate(selectedMoment);
      } else {
        setSelectedStartDate(selectedMoment);
        setStartDateInputIsActive(false);
        setEndDateInputIsActive(true);
      }
    } else {
      if ((selectedStartDate && selectedMoment.diff(selectedStartDate)) < 0) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedMoment);
      } else {
        setSelectedEndDate(selectedMoment);
        setEndDateInputIsActive(false);
        setStartDateInputIsActive(true);
      }
    }
  };

  const handleDescriptionChange = (event) => {
    setVacationRequestDescription(event.target.value);
  };

  const clearAll = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setStartDateInputIsActive(true);
    setEndDateInputIsActive(false);
    setVacationRequestDescription("");
  };

  return (
    <Wrapper>
      <h4 className="vacation-form-title">Vacation Request</h4>
      <h5></h5>
      <Form method="post" className="vacation-form">
        <div className="form-content">
          <div className="calendar-container">
            <SmallCalendar
              getCellProps={(date, month, year) => {
                const dayMoment = moment(`${date}${month}${year}`, "DDMMYYYY");
                return {
                  isSelected:
                    dayMoment.isSame(selectedStartDate, "date") ||
                    dayMoment.isSame(selectedEndDate, "date") ||
                    selectedDates.some((selectedDate) =>
                      selectedDate.isSame(dayMoment, "date")
                    ),
                  isStart: dayMoment.isSame(selectedStartDate, "date"),
                  isEnd: dayMoment.isSame(selectedEndDate, "date"),
                };
              }}
              onCellClicked={onDateSelected}
              month={currentMonthMoment.format("MM")}
              year={currentMonthMoment.format("YYYY")}
              onPrev={decrementMonth}
              onNext={incrementMonth}
              cellComponent={PillCell}
              clearAll={clearAll}
            />
          </div>
          <div className="form-inputs">
            <input
              type="hidden"
              name="vacationRequestStatus"
              defaultValue={VACATION_REQUEST_STATUS.PENDING}
            />
            <div className="date-input-group">
              <input
                type="hidden"
                name="fromDate"
                readOnly
                defaultValue={
                  selectedStartDate && selectedStartDate.format("YYYY-MM-DD")
                }
                placeholder="From Date"
              />
              <input
                type="hidden"
                name="toDate"
                readOnly
                defaultValue={
                  selectedEndDate && selectedEndDate.format("YYYY-MM-DD")
                }
                placeholder="To Date"
              />
            </div>
            <h5>
              From:{" "}
              {selectedStartDate && selectedStartDate.format("MMM Do, YYYY")}
            </h5>
            <h5>
              To: {selectedEndDate && selectedEndDate.format("MMM Do, YYYY")}
            </h5>
            <label htmlFor="vacationRequestDescription">
              Reason for taking vacation (optional)
            </label>
            <textarea
              name="vacationRequestDescription"
              value={vacationRequestDescription}
              onChange={handleDescriptionChange}
            />
            <div className="btn-container">
              <button type="button" className="btn" onClick={clearAll}>
                Clear
              </button>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};
export default VacationRequest;
