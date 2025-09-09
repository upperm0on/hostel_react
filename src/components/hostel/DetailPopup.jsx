import { useEffect } from "react";
import "../../assets/css/hostel/DetailPopup.css";
import DetailRoom from "./DetailRoom";

function DetailPopup({ hostel, open, onClose }) {
  if (!hostel || !open) return null;

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Safely parse room details
  const room_details = Array.isArray(hostel.room_details)
    ? hostel.room_details
    : JSON.parse(hostel.room_details || "[]");

  const additional_details = JSON.parse(hostel.additional_details);
  
  return (
    <div className="detail_popup_backdrop" onClick={onClose}>
      <div className="detail_popup" onClick={(e) => e.stopPropagation()}>
        <div className="flex-content">
          <button className="close_btn" onClick={onClose}>
            <img src="/icons/close_button.svg" alt="Close" />
          </button>

          <div className="hostel_details">
            <div className="image_section">
              <img
                src={"/" + hostel.image || "#"}
                alt={hostel.name || "Hostel"}
              />
            </div>
            <div className="details_section">
              <div className="hostel_name">{hostel.name}</div>
              <div className="campus">Campus <div className="campus_campus">{hostel.campus.campus}</div></div>
              <div className="campus">Rating <div className="campus_campus">{hostel.ratings}</div></div>
              <ul className="general_amenities">
                <h3>General Amenities</h3>
                {additional_details.map((detail, key) => (
                  <li className="general_amenity-item" key={key}>
                    {detail}
                  </li>
                ))}
              </ul>
              {room_details.map((detail, key) => (
                <DetailRoom key={key} room_details={detail} hostel={hostel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
