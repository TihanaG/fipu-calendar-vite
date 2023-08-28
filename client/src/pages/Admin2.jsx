import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Admin";
import { toast } from "react-toastify";
import moment from "moment";
import { getDaysInMonth } from "../utils/util";
import { useState } from "react";
import CalendarControls from "../components/calendar/CalendarControls";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-reports");
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
  const { users, events, userReports } = useLoaderData();

  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);

  console.log(getDaysInMonth(currentMonthMoment));
  const daysInMonth = getDaysInMonth(currentMonthMoment);

  return (
    <Wrapper>
      <CalendarControls />
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
