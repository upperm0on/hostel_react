import { useEffect } from "react";
import "../../assets/css/hostel/DetailPopup.css";
import DetailRoom from "./DetailRoom";
import { X, Star, MapPin, Wifi, Car, Shield, Utensils, Dumbbell, Users, Phone, Mail } from "lucide-react";

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
        <div className="popup_header">
          <button className="close_btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="hostel_details">
          <div className="image_section">
            <img
              src={"/" + hostel.image || "#"}
              alt={hostel.name || "Hostel"}
            />
            <div className="image_overlay">
              <div className="hostel_badge">
                <Star size={16} className="star_icon" />
                <span>{hostel.ratings || "N/A"}</span>
              </div>
            </div>
          </div>
          
          <div className="details_section">
            <div className="hostel_info">
              <h1 className="hostel_name">{hostel.name}</h1>
              <div className="hostel_meta">
                <div className="meta_item">
                  <MapPin size={18} className="meta_icon" />
                  <span className="meta_label">Campus:</span>
                  <span className="meta_value">{hostel.campus?.campus || "N/A"}</span>
                </div>
                <div className="meta_item">
                  <Star size={18} className="meta_icon" />
                  <span className="meta_label">Rating:</span>
                  <span className="meta_value">{hostel.ratings || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="amenities_section">
              <h3 className="section_title">
                <Users size={20} className="section_icon" />
                General Amenities
              </h3>
              <div className="amenities_grid">
                {additional_details.map((detail, key) => (
                  <div className="amenity_item" key={key}>
                    <div className="amenity_icon">
                      {detail.toLowerCase().includes('wifi') && <Wifi size={16} />}
                      {detail.toLowerCase().includes('parking') && <Car size={16} />}
                      {detail.toLowerCase().includes('security') && <Shield size={16} />}
                      {detail.toLowerCase().includes('kitchen') && <Utensils size={16} />}
                      {detail.toLowerCase().includes('gym') && <Dumbbell size={16} />}
                      {!detail.toLowerCase().includes('wifi') && 
                       !detail.toLowerCase().includes('parking') && 
                       !detail.toLowerCase().includes('security') && 
                       !detail.toLowerCase().includes('kitchen') && 
                       !detail.toLowerCase().includes('gym') && 
                       <Users size={16} />}
                    </div>
                    <span className="amenity_text">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rooms_section">
              <h3 className="section_title">
                <Users size={20} className="section_icon" />
                Available Rooms
              </h3>
              <div className="rooms_list">
                {room_details.map((detail) => (
                  <DetailRoom key={detail.uuid || detail.number_in_room} room_details={detail} hostel={hostel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
