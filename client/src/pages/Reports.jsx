import { ReportsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarControls from "../components/calendar/CalendarControls";

export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const response = await customFetch.get(`/events/reports`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
  const { defaultReports } = useLoaderData();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (month && year) {
      const newMonthMoment = moment({
        year: parseInt(year),
        month: parseInt(month) - 1,
      });
      setCurrentMonthMoment(newMonthMoment);
    } else {
      setCurrentMonthMoment(today); // Set to today's date if no month and year in URL
    }
  }, [location.search]);

  const incrementMonth = () => {
    const newMonthMoment = moment(currentMonthMoment).add(1, "months");
    navigate(
      `/dashboard/reports?month=${newMonthMoment.format(
        "MM"
      )}&year=${newMonthMoment.format("YYYY")}`
    );
  };

  const decrementMonth = () => {
    const newMonthMoment = moment(currentMonthMoment).subtract(1, "months");
    setCurrentMonthMoment(newMonthMoment);
    navigate(
      `/dashboard/reports?month=${newMonthMoment.format(
        "MM"
      )}&year=${newMonthMoment.format("YYYY")}`
    );
  };

  const setToday = () => {
    setCurrentMonthMoment(today);
    navigate(
      `/dashboard/reports?month=${today.format("MM")}&year=${today.format(
        "YYYY"
      )}`
    );
  };

  return (
    <>
      <CalendarControls
        currentMonthMoment={currentMonthMoment}
        decrementMonth={decrementMonth}
        incrementMonth={incrementMonth}
        setToday={setToday}
      />
      <ReportsContainer defaultReports={defaultReports} />
    </>
  );
};

export default Reports;
