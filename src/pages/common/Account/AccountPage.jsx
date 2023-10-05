
import { Fragment, useContext, useEffect, useState } from "react";
import request from "../../../server";
import Cookies from "js-cookie";
import { Tabs, message } from "antd";
import { ROLE, TOKEN } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import BtnLoading from "../../../components/btnLoading/BtnLoading";


import "./account.scss"
import TabPane from "antd/es/tabs/TabPane";
const AccountPage = () => {

  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [handleValue, setHandleValue] = useState({});

  console.log(handleValue);

  useEffect(() => {
    getInput();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    navigate("/");
  };
  async function getInput() {
    try {
      setLoading(true);
      let { data } = await request.get("/auth/me");
      setHandleValue(data);
    } catch (err) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await request.put("auth/details", handleValue);
      message.success("Successfull changed");
      setLoading(false);
    } catch (error) {
      message.error("Invalid");
    }
  };
  return (
    <Fragment>
      <section className="account">
        <div className="container">
          {/* <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tabs eventKey="home" title="Edit Account">
              <form onSubmit={submit} className="account__wrapper">
                <div className="account__wrapper__form__firstname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        first_name: e.target.value,
                      });
                    }}
                    id="first_name"
                    type="text"
                    value={handleValue.first_name}
                  />
                </div>
                <div className="account__wrapper__form__lastname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        last_name: e.target.value,
                      });
                    }}
                    id="last_name"
                    type="text"
                    placeholder="Last name"
                    value={handleValue.last_name}
                  />
                </div>
                <div className="account__wrapper__form__username">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        username: e.target.value,
                      });
                    }}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={handleValue.username}
                  />
                </div>
                <div className="account__wrapper__form__password">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                    value={handleValue.password}
                  />
                </div>
                <div className="register__box__form__submit">
                  <button type="submit">
                    {" "}
                    {loading ? <BtnLoading /> : "submit"}
                  </button>
                </div>
              </form>
            </Tabs>
            <Tabs eventKey="profile" title="Edit Parol">
              <div className="passwords">
                <div className="account__wrapper__form__password__current">
                  <label htmlFor="">currrent password</label>
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="">New password</label>
                </div>
                <div className="account__wrapper__form__password__new">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                </div>
                <div className="btn">
                  <button>submit</button>
                </div>
              </div>
            </Tabs>
          </Tabs> */}
          <Tabs
            defaultActiveKey="1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TabPane tab="Edit Account" key="1" style={{ width: "50%" }}>
              <form onSubmit={submit} className="account__wrapper">
                <div className="account__wrapper__form__firstname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        first_name: e.target.value,
                      });
                    }}
                    id="first_name"
                    type="text"
                    value={handleValue.first_name}
                  />
                </div>
                <div className="account__wrapper__form__lastname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        last_name: e.target.value,
                      });
                    }}
                    id="last_name"
                    type="text"
                    placeholder="Last name"
                    value={handleValue.last_name}
                  />
                </div>
                <div className="account__wrapper__form__username">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        username: e.target.value,
                      });
                    }}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={handleValue.username}
                  />
                </div>
                <div className="account__wrapper__form__password">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                    value={handleValue.password}
                  />
                </div>
                <div className="register__box__form__submit">
                  <button type="submit">
                    {" "}
                    {loading ? <BtnLoading /> : "submit"}
                  </button>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Edit Parol" key="2">
              <div className="passwords">
                <div className="account__wrapper__form__password__current">
                  <label htmlFor="">currrent password</label>
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="">New password</label>
                </div>
                <div className="account__wrapper__form__password__new">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                </div>
                <div className="btn">
                  <button>submit</button>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div className="Logout">
            <button className="logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default AccountPage