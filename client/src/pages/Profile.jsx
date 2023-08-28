import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/users/update-user", data);
    toast.success("Changes saved");
    return null;
    //return redirect("/profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
    return error;
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          {/* file input */}
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
