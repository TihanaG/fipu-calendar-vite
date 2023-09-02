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
import { SearchContainer } from "../components";

export const loader = async ({ request }) => {
  console.log("hello");
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get(
      "/users/admin/all-vacation-requests",
      {
        params,
      }
    );
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const AllVacationRequestsContext = createContext();
const AdminVacationRequests = () => {
  const { data, searchValues } = useLoaderData();
  console.log(data);
  return (
    <AllVacationRequestsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <AllVacationRequestsContainer />
    </AllVacationRequestsContext.Provider>
  );
};

export const useAllVacationRequestsContext = () =>
  useContext(AllVacationRequestsContext);

export default AdminVacationRequests;
