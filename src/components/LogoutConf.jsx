import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import "../assets/css/LogoutConf.css";

function LogoutConfirm({ children, onConfirm }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("search_data");
    localStorage.removeItem("information");
    localStorage.removeItem("room_booked");
    window.location.href = "/";
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="logout-wrapper">
      {/* The Logout trigger */}
      <div
        ref={buttonRef}
        className="logout-trigger"
        onClick={() => setOpen(!open)}
      >
        {children}
      </div>

      {/* Modal overlay */}
      {open && (
        <div className="logout-overlay">
          <div ref={popupRef} className="logout-modal">
            <div className="modal-header">
              <div className="modal-icon">
                <LogOut size={20} />
              </div>
              <h3 className="modal-title">Confirm Logout</h3>
            </div>
            
            <div className="modal-content">
              <p className="modal-message">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm-btn" 
                onClick={() => {
                  if (onConfirm) {
                    onConfirm(logout());
                  } else {
                    logout();
                  }
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoutConfirm;
