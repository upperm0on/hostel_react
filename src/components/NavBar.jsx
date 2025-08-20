import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/NavBar.css";
import LogoutConfirm from "./LogoutConf";

function NavBar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("name"));

  // Keep state in sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("name"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.svg" alt="logo here" />
        </Link>
      </div>

      <ul className="nav-links">
        <li className="nav-links-item">
          <Link to="/hostels" className="nav-link">
            <div className="icon-container">
              <img src="/icons/hostels.svg" alt="login icon" />
            </div>
            Hostels
          </Link>
        </li>
      </ul>

      {token ? (
        <div className="buttons_united">
          <div className="nav-links-item">
            <Link to="/dashboard" className="nav-link">
              <div className="button_img">
                <img src="/icons/person.svg" alt="" /> {username}
              </div>
            </Link>
          </div>
          <LogoutConfirm>
            <span className="cursor-pointer">{username}</span>
          </LogoutConfirm>
        </div>
      ) : (
        <ul className="login-buttons">
          <li className="nav-links-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
