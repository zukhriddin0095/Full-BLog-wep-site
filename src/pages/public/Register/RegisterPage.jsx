import { useState } from "react";
import request from "../../../server";
import { message } from "antd";

import "./register.scss";
import BtnLoading from "../../../components/btnLoading/BtnLoading";
const RegisterPage = () => {
  const [handleValue, setHandleValue] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState();

  const handeChange = (e) => {
    setHandleValue({ ...handleValue, [e.target.id]: e.target.value });
  };
  const regiter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await request.post("/auth/register", handleValue);
      setLoading(false);
    } catch (err) {
      message.error("hato bo'ldi");
      setLoading(false);
    }
  };
  return (
    <main>
      <section className="register">
        <div className="container">
          <div className="register__box">
            <h1>Account</h1>
            <form className="register__box__form">
              <div className="register__box__form__firstname">
                <input
                  onChange={(e) => handeChange(e)}
                  id="first_name"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="register__box__form__lastname">
                <input
                  onChange={(e) => handeChange(e)}
                  id="last_name"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <div className="register__box__form__username">
                <input
                  onChange={(e) => handeChange(e)}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="register__box__form__password">
                <input
                  onChange={(e) => handeChange(e)}
                  id="password"
                  type="password"
                />
              </div>
              {/* <div className="register__box__form__confirm">
                <input
                  onChange={(e) => handeChange(e)}
                  id="confirm"
                  type="password"
                />
              </div> */}
              <div className="register__box__form__submit">
                <button onClick={regiter} type="submit">
                  {loading ? <BtnLoading /> : "submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
