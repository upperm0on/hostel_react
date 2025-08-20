import { useState, useRef, useEffect } from "react";
import "../assets/css/LogoutConf.css";

function LogoutConfirm({ onConfirm }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/signup";
  };

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="logout-wrapper">
      {/* The Logout button */}
      <button
        ref={buttonRef}
        className="logout-btn"
        onClick={() => setOpen(!open)}
      >
        Logout
      </button>

      {/* Popover confirmation */}
      {open && (
        <div ref={popupRef} className="logout-popup">
          <p>Are you sure you want to logout?</p>
          <div className="popup-actions">
            <button className="confirm" onClick={() => onConfirm(logout())}>
              Yes
            </button>
            <button className="cancel" onClick={() => setOpen(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoutConfirm;
