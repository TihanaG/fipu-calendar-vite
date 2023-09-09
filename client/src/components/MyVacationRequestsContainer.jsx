import MyVacation from "./MyVacation";
import Wrapper from "../assets/wrappers/AllVacationRequestsContainer";
import { useMyRequestsContext } from "../pages/MyRequests";

const MyVacationRequestsContainer = () => {
  const { data } = useMyRequestsContext();
  const { vacationRequests, totalVacationRequests } = data;
  if (vacationRequests.length === 0) {
    return (
      <Wrapper>
        <h3>No vacation requests to display...</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalVacationRequests} vacation request{vacationRequests.length > 1 && 's'} found
      </h5>
      <div className="requests">
        {vacationRequests.map((vacationRequest) => {
          return <MyVacation key={vacationRequest._id} {...vacationRequest} />;
        })}
      </div>
    </Wrapper>
  );
};
export default MyVacationRequestsContainer;
