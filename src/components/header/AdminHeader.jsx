import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ROLE, TOKEN } from "../../constants";
import Cookies from "js-cookie";




import "./admin.scss"
const AdminHeader = () => {

  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    handleScroll();
  }, []);

  function handleScroll() {
    if (window.scrollY >= 120) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  }
  window.addEventListener("scroll", handleScroll);

  function handleToggle() {
    setToggle(true);
  }
  function closeToggle() {
    setToggle(false);
  }

  const handleBtn = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    navigate("/login");
  };
  return (
    <header
      onScroll={() => handleScroll}
      className={header ? "headerScrol" : "header"}
    >
      <div className="container">
        <nav className="header__navbar">
          <div className="header__navbar__logo">
            <Link to="/dashboard">
              <img src="/logo.svg" alt="logo" width={"140px"} height={"28px"} />
            </Link>
          </div>
          <div className="header__navbar__link">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/categories">category</NavLink>
            <NavLink to="/users">users</NavLink>
          </div>
          <div className="header__navbar__toggle__btn">
            <button onClick={handleToggle}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <div className="header__navbar__link__login">
            <button onClick={handleBtn}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={toggle ? "header__navbar__open" : "header__navbar__toggle"}
      >
        <button onClick={closeToggle} className="close">
          ✖️
        </button>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/categories">category</NavLink>
        <NavLink to="/users">users</NavLink>
        <div className="header__navbar__open__login__toggle">
          <button onClick={handleBtn}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader