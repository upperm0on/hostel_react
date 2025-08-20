import { Link } from "react-router-dom";
import "../assets/css/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="logo">
       <Link to='/'><img src="/images/logo.svg" alt="logo here" /></Link>
      </div>
      <p className="footer-text">
        The nation with the best hostsels for Students
      </p>
      <div className="flex-content">
        <ul className="flex-content-item">
          <li className="c1-item">Address</li>
          <li className="c1-item">Contact</li>
          <li className="c1-item">Email</li>
        </ul>
        <ul className="flex-content-item">
          <li className="c2-item">Join Us</li>
          <li className="c2-item">Join Our Team</li>
          <li className="c2-item">Guest Privacy</li>
          <li className="c2-item">Terms and Conditions</li>
          <li className="c2-item">Privacy Policy</li>
          <li className="c2-item">Advertise Here</li>
        </ul>
      </div>
      <p className="footer-sub_text">Mi Casa es tu Casa</p>
    </footer>
  );
}

export default Footer;
