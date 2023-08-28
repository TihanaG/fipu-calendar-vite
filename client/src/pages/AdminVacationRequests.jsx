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
import AllVacationRequestsContainer from "../components/AllVacationRequestsContainer";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get(
      "/users/admin/all-vacation-requests"
    );
    return { data };
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const AllVacationRequestsContext = createContext();
const AdminVacationRequests = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <AllVacationRequestsContext.Provider value={{ data }}>
      <h4>All Vacation Requests</h4>
      <AllVacationRequestsContainer />
    </AllVacationRequestsContext.Provider>
  );
};

export const useAllVacationRequestsContext = () => useContext(AllVacationRequestsContext);

export default AdminVacationRequests;
