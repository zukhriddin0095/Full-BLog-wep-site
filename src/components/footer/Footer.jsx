import { Link } from "react-router-dom";




import "./footer.scss"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__wrapper__title">
            <h5>Finstreet 118 2561 Fintown</h5>
            <h5>Hello@finsweet.com 020 7993 2905</h5>
          </div>
          <div className="footer__wrapper__social">
            <Link to="https://www.instagram.com/zukhriddin0095/">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link to="https://www.instagram.com/zukhriddin0095/">
              <i className="fa-brands fa-twitter"></i>
            </Link>
            <Link to="https://www.instagram.com/zukhriddin0095/">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="https://www.instagram.com/zukhriddin0095/">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer