import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/EditVacationRequest";
import moment from "moment";
import { FormRowSelect } from "../components";
import { VACATION_REQUEST_STATUS } from "../../../utils/constants";
import { useState } from "react";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/vacation-requests/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/my-requests");
  }
};

const MyRequest = () => {
  const { vacationRequest } = useLoaderData();
  console.log(vacationRequest);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const firstDate = moment(vacationRequest.fromDate).format("DD.MM.YYYY");
  const lastDate = moment(vacationRequest.toDate).format("DD.MM.YYYY");

  const [
    vacationRequestRejectionExplanation,
    setVacationRequestRejectionExplanation,
  ] = useState(vacationRequest.rejectionExplanation);

  const handleDescriptionChange = (event) => {
    setVacationRequestRejectionExplanation(event.target.value);
  };

  return (
    <Wrapper>
      <div className="form">
        <h4 className="form-title">
          vacation request from {vacationRequest.createdBy.name}{" "}
          {vacationRequest.createdBy.lastName}
        </h4>
        <h4 className="form-title">
          {firstDate} - {lastDate}
        </h4>
        <label htmlFor="rejectionExplanation">
          Reason for taking vacation:
        </label>
        <p className="description">
          {vacationRequest.vacationRequestDescription
            ? vacationRequest.vacationRequestDescription
            : "-"}
        </p>

        <label htmlFor="rejectionExplanation">
          Rejection explanation (optional)
        </label>
        <p className="description">
          {vacationRequestRejectionExplanation
            ? vacationRequestRejectionExplanation
            : "-"}
        </p>
        <div className={`status ${vacationRequest.vacationRequestStatus}`}>
          {vacationRequest.vacationRequestStatus}
        </div>
      </div>
      <Link className="btn form-btn" to={`../my-requests`}>
        Natrag
      </Link>
    </Wrapper>
  );
};
export default MyRequest;
