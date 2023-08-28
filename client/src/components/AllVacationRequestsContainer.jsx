import { useAllVacationRequestsContext } from "../pages/AdminVacationRequests";
import Vacation from "./Vacation";
import Wrapper from "../assets/wrappers/AllVacationRequestsContainer";

const AllVacationRequestsContainer = () => {
  const { data } = useAllVacationRequestsContext();
  const { vacationRequests } = data;
  if (vacationRequests.length === 0) {
    return (
      <Wrapper>
        <h2>No vacation requests to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="requests">
        {vacationRequests.map((vacationRequest) => {
          return (
            <Vacation
              key={vacationRequest._id}
              {...vacationRequest}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default AllVacationRequestsContainer;
