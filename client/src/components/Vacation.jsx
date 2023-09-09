import moment from "moment";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Vacation";
import { FaCalendarAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

const Vacation = ({
  _id,
  fromDate,
  toDate,
  createdBy,
  vacationRequestDescription,
  rejectionExplanation,
  vacationRequestStatus,
}) => {
  const firstDate = moment(fromDate).format("DD.MM.YYYY");
  const lastDate = moment(toDate).format("DD.MM.YYYY");
  return (
    <Wrapper>
      {createdBy.name !== "Test" && (
        <header>
          <div className="main-icon">{createdBy.name.charAt(0)}</div>
          <div className="info">
            <h5>
              {createdBy.name} {createdBy.lastName}
            </h5>
          </div>
          <div className="content">
            <FaCalendarAlt /> {firstDate} - {lastDate}
          </div>
          <div className={`status ${vacationRequestStatus}`}>
            {vacationRequestStatus}
          </div>
          <div className="more-btn">
            <Link to={`../edit-vacation-request/${_id}`}>
              <FiMoreVertical />
            </Link>
          </div>
        </header>
      )}
    </Wrapper>
  );
};
export default Vacation;
