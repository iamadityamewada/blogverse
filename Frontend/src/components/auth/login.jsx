import { useState } from "react";
import SocialLogin from "../utils/social";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { api_url } from "../../utils/constant";

const Login = () => {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const onValueChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };
  // api call

  const onLoginClick = () => {
    setIsLoading(true);
    axios
      .post(`${api_url}/auth/login`, values)
      .then((res) => {
        setTimeout(() => {
          toast.success("Login Successfully");
          setIsLoading(false);
          const { user, token } = res.data;
          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(user));

          // redirect to home page
          window.location.href = "/home";
        }, 3000);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(err?.response?.data?.error || "Something Went Wrong");
          setIsLoading(false);
        }, 3000);
      });
  };
  return (
    <form className="sign-in-form">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          required
          onChange={onValueChange("username")}
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          required
          onChange={onValueChange("password")}
          type="password"
          placeholder="Password"
        />
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <input
          type="button"
          onClick={onLoginClick}
          value="Login"
          className="btn btn-dark"
        />
      )}
      <p className="social-text">Or Sign in with social platforms</p>
      <SocialLogin />
    </form>
  );
};

export default Login;
