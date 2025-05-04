import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { api_url } from "../../utils/constant";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(!localStorage.getItem("authToken")){
        navigate("/");
        return;
    }
    axios
      .get(`${api_url}/auth/is-auth`, {
        headers: {
          Authorization: `jwt ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setIsAuth(true);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);
  return isAuth ? (
    <Outlet />
  ) : (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  );
};

export default ProtectedRoute;
