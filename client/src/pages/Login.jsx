import {
  Form,
  redirect,
  useNavigation,
  Link,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    const userData = response.data;
    console.log("My data", userData);
    if (userData.role === "admin") {
      // Redirect to the admin dashboard if the user is an admin
      return redirect("/dashboard/monthly-report");
    } else {
      // Redirect to the regular user dashboard if the user is not an admin
      return redirect("/dashboard");
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginTestUser = async () => {
    const data = {
      email: "test@example.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("See It in Action");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submiting..." : "submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginTestUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
