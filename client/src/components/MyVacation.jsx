import moment from "moment";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/MyVacation";
import { FaCalendarAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

const MyVacation = ({
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

  // Split the rejection explanation into words
  const words = rejectionExplanation.split(' ');

  // Take the first five words and join them back into a string
  const truncatedExplanation = words.slice(0, 5).join(' ');

  return (
    <Wrapper>
      <header>
        <div className="content">
          <FaCalendarAlt /> {firstDate} - {lastDate}
        </div>
        <div className="info">{truncatedExplanation}{truncatedExplanation && "..."}</div>
        <div className={`status ${vacationRequestStatus}`}>
          {vacationRequestStatus}
        </div>
        <div className="more-btn">
          <Link to={`../my-requests/${_id}`}>
            <FiMoreVertical />
          </Link>
        </div>
      </header>
    </Wrapper>
  );
};
export default MyVacation;
