import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import moment from "moment";
import { FormRowSelect } from "../components";
import { VACATION_REQUEST_STATUS } from "../../../utils/constants";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/users/admin/edit-vacation-request/${params.id}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-vacation-requests");
  }
};

/*
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.patch(
      `/users/admin/edit-vacation-request/${params.id}`,
      data
    );
    if (data.vacationRequestStatus === "approved") {
      console.log("approved");
    }
    toast.success("Vacation request updated");
    return redirect("/dashboard/all-vacation-requests");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
*/

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("Data:", data);

  try {
    const response = await customFetch.post(
      `/users/admin/edit-vacation-request/${params.id}`,
      data
    );
    console.log("Server Response:", response);
    return redirect("/dashboard/all-vacation-requests");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log("greska");
    return redirect("/dashboard");
  }
};

const EditVacationRequest = () => {
  const { vacationRequest } = useLoaderData();
  console.log(vacationRequest);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const firstDate = moment(vacationRequest.fromDate).format("YYYY-MM-DD");
  const lastDate = moment(vacationRequest.toDate).format("YYYY-MM-DD");

  const fromDate = moment(vacationRequest.fromDate);
  const toDate = moment(vacationRequest.toDate);

  const generateDatesBetween = (startDate, endDate) => {
    const dates = [];
    const currentDate = startDate.clone();
    while (currentDate <= endDate) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "days");
    }
    return dates;
  };

  const datesBetween = generateDatesBetween(fromDate, toDate);

  console.log(datesBetween);

  const eventDate = "eventDate";
  const eventType = "eventType";
  const createdBy = "createdBy";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">
          vacation request from {vacationRequest.createdBy.name}{" "}
          {vacationRequest.createdBy.lastName}
        </h4>
        <h4>
          {firstDate} - {lastDate}
        </h4>
        <input
          type="text"
          id={eventDate}
          name={eventDate}
          defaultValue={firstDate}
        />
        <input
          type="text"
          id={eventType}
          name={eventType}
          defaultValue="godisnji"
        />
        <input
          type="text"
          id={createdBy}
          name={createdBy}
          defaultValue={vacationRequest.createdBy._id}
        />
        <h4>Reason for taking vacation</h4>
        <p>{vacationRequest.vacationRequestDescription}</p>

        <label htmlFor="rejectionExplanation">
          Rejection explanation (optional)
        </label>
        <textarea name="rejectionExplanation" />
        <FormRowSelect
          name="vacationRequestStatus"
          labelText="status"
          defaultValue={vacationRequest.vacationRequestStatus}
          list={Object.values(VACATION_REQUEST_STATUS)}
        />
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default EditVacationRequest;
