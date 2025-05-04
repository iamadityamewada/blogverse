import { useEffect, useState } from "react";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import axios from "axios";
import { api_url } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    if(isAuth) return;

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container-main");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, [isAuth])

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      setIsAuth(false)
      return;
    }
    // is user loggedin or not.
    axios
      .get(`${api_url}/auth/is-auth`, {
        headers: {
          Authorization: `jwt ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        navigate("/home")
      })
      .catch((err) => {
        setTimeout(() => {
          setIsAuth(false)
        }, 3000)
      });
  }, []);

  return !isAuth ? (
    <div className="container-main">
      <div className="forms-container">
        <div className="signin-signup">
          <Login />
          <Signup />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--log-register-form-user-interface-pack-design-development-illustrations-6430773.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--log-register-form-user-interface-pack-design-development-illustrations-6430773.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Auth;
