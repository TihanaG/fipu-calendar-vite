import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { VACATION_REQUEST_STATUS } from "../../../utils/constants";
import { useAllVacationRequestsContext } from "../pages/AdminVacationRequests";

const SearchContainer = () => {
  const { searchValues } = useAllVacationRequestsContext();
  console.log(searchValues);
  const { search, vacationRequestStatus } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">Vacation Requests</h4>
        <div className="form-center">
          <FormRow
            labelText="search User"
            type="search"
            name="search"
            defaultValue={search}
            // onChange={(e) => e.currentTarget.form.reset()}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="status"
            name="vacationRequestStatus"
            list={["all", ...Object.values(VACATION_REQUEST_STATUS)]}
            defaultValue={vacationRequestStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/vacation-requests"
            className="btn form-btn delete-btn"
          >
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
