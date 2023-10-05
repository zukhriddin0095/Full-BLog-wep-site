



import { Fragment, useContext, useState } from "react";



import "./login.scss"
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import { ROLE, TOKEN } from "../../../constants";
import request from "../../../server";
import BtnLoading from "../../../components/btnLoading/BtnLoading";
const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [handleValue, setHandleValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setHandleValue({ ...handleValue, [e.target.id]: e.target.value });
  }
  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let {
        data: { token, role },
      } = await request.post("Auth/login", handleValue);
      if (role === "user"){
        navigate("/my-blogs");
      }else if (role === "admin") {
        navigate("/dashboard")
      }
      setIsAuthenticated(true);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      setLoading(false);
    } catch (err) {
      message.error("Login Hato");
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="Login">
          <form className="Login__form">
            <div className="Login__form__title">
              <h1>Login</h1>
            </div>
            <div className="Login__form__username">
              <input
                id="username"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="Login__form__password">
              <input
                id="password"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="password"
              />
            </div>
            <div className="Login__form__submit">
              <button onClick={login} type="submit">
                {loading ? <BtnLoading /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPage