import {
  useLoaderData,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Admin";
import { toast } from "react-toastify";
import moment from "moment";
import { getDaysInMonth } from "../utils/util";
import { useEffect, useState } from "react";
import CalendarControls from "../components/calendar/CalendarControls";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const response = await customFetch.get("/users/admin/app-reports", {
      params: params,
    });
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const eventAbbreviations = {
  rad: "R",
  rad_od_kuce: "RK",
  bolovanje: "B",
  sluzbeni_put: "SP",
  godisnji: "G",
};

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
  const { users, events, userReports } = useLoaderData();

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
    // Update the URL with the new month and year
    navigate(
      `/dashboard/admin?month=${newMonthMoment.format(
        "MM"
      )}&year=${newMonthMoment.format("YYYY")}`
    );
  };

  const decrementMonth = () => {
    const newMonthMoment = moment(currentMonthMoment).subtract(1, "months");
    setCurrentMonthMoment(newMonthMoment);
    // Update the URL with the new month and year
    navigate(
      `/dashboard/admin?month=${newMonthMoment.format(
        "MM"
      )}&year=${newMonthMoment.format("YYYY")}`
    );
  };

  const setToday = () => {
    setCurrentMonthMoment(today);
    // Update the URL with today's month and year
    navigate(
      `/dashboard/admin?month=${today.format("MM")}&year=${today.format(
        "YYYY"
      )}`
    );
  };

  console.log(getDaysInMonth(currentMonthMoment));
  const daysInMonth = getDaysInMonth(currentMonthMoment);

  return (
    <Wrapper>
      <CalendarControls
        currentMonthMoment={currentMonthMoment}
        decrementMonth={decrementMonth}
        incrementMonth={incrementMonth}
        setToday={setToday}
      />
      <div className="table-container">
        <div className="table-scroll">
          <table className="minimal-table">
            <thead>
              <tr>
                <th className="name-column">Name</th>
                {daysInMonth.map((date) => (
                  <th
                    key={date}
                    className={`date-column ${
                      moment(date).isoWeekday() === 6 ||
                      moment(date).isoWeekday() === 7
                        ? "weekend"
                        : ""
                    }`}
                  >
                    {moment(date).format("DD")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userReports.map((person, index) => (
                <tr key={person._id}>
                  <td className="name-cell">{person.name}</td>
                  {daysInMonth.map((date) => {
                    const userEvent = person.userEvents.find((event) =>
                      moment(event.eventDate).isSame(date, "day")
                    );
                    const eventTypeAbbreviation = userEvent
                      ? eventAbbreviations[userEvent.eventType] ||
                        userEvent.eventType
                      : "-";
                    return (
                      <td
                        key={date}
                        className={`data-cell ${
                          moment(date).isoWeekday() === 6 ||
                          moment(date).isoWeekday() === 7
                            ? "weekend"
                            : ""
                        }`}
                      >
                        {eventTypeAbbreviation}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};
export default Admin;
