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
import { createContext, useContext } from "react";
import MyVacationRequestsContainer from "../components/MyVacationRequestsContainer";
import SearchMyRequest from "../components/SearchMyRequest";

export const loader = async ({ request }) => {
  console.log("hello");
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get("/vacation-requests");
    return { data };
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const MyRequestsContext = createContext();
const MyRequests = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <MyRequestsContext.Provider value={{ data }}>
      <SearchMyRequest />
      <MyVacationRequestsContainer />
    </MyRequestsContext.Provider>
  );
};

export const useMyRequestsContext = () => useContext(MyRequestsContext)

export default MyRequests;
