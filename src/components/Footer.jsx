import { Link } from "react-router-dom";
import "../assets/css/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="logo">
       <Link to='/'><img src="/images/logo.svg" alt="HostelHQ Logo" /></Link>
      </div>
      <p className="footer-text">
        Connecting students with the perfect hostel experience. Find your ideal accommodation with verified listings and trusted reviews.
      </p>
      <div className="flex-content">
        <ul className="flex-content-item">
          <li className="c1-item">Quick Links</li>
          <li className="c2-item">Browse Hostels</li>
          <li className="c2-item">Student Resources</li>
          <li className="c2-item">Campus Guide</li>
          <li className="c2-item">Safety Tips</li>
        </ul>
        <ul className="flex-content-item">
          <li className="c1-item">Support</li>
          <li className="c2-item">Help Center</li>
          <li className="c2-item">Contact Us</li>
          <li className="c2-item">Report Issue</li>
          <li className="c2-item">Feedback</li>
        </ul>
        <ul className="flex-content-item">
          <li className="c1-item">Legal</li>
          <li className="c2-item">Privacy Policy</li>
          <li className="c2-item">Terms of Service</li>
          <li className="c2-item">Cookie Policy</li>
          <li className="c2-item">Disclaimer</li>
        </ul>
      </div>
      <p className="footer-sub_text">Your Home Away From Home</p>
    </footer>
  );
}

export default Footer;
