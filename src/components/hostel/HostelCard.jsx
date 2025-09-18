import { useState } from "react";
import "../../assets/css/hostel/HostelCard.css";
import DetailPopup from "./DetailPopup";
import { Star, Users, MapPin, Eye, AlertTriangle } from "lucide-react";

function HostelCard({ hostel }) {
  const [open, setOpen] = useState(false);

  // Make sure room_details exists and is an array
  const normalizeRooms = (value) => {
    try {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        }
        return [];
      }
      if (typeof value === "object" && value !== null) {
        return Array.isArray(value) ? value : [];
      }
      return [];
    } catch (e) {
      console.error("Error normalizing room_details:", e);
      return [];
    }
  };

  const room_details = normalizeRooms(hostel.room_details);

  const base_image_url = '/'
  
  return (
    <>
      <DetailPopup
        hostel={hostel}
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className={`hostel_card ${hostel.is_available === false || hostel.status !== 'Available' ? 'not-available' : ''}`} onClick={() => setOpen(true)}>
        <div className="card-img-container">
          <img
            src={base_image_url + hostel?.image || "/images/hostel4.png"}
            alt={hostel?.name || "Hostel image"}
          />
          <div className="card-overlay">
            <div className="view-details">
              <Eye size={20} />
              <span>View Details</span>
            </div>
            {(hostel.is_available === false || hostel.status !== 'Available') && (
              <div className="availability_badge" aria-label="Hostel not available">
                <AlertTriangle size={16} className="availability_icon" />
                <span className="availability_text">Not Available</span>
              </div>
            )}
          </div>
        </div>
        <div className="hostel_details">
          <div className="hostel_header">
            <h3 className="hostel_name">{hostel?.name || "Unknown Hostel"}</h3>
            <div className="rating">
              <Star size={16} className="star-icon" />
              <span>{hostel?.rating ?? "N/A"}</span>
            </div>
          </div>
          <div className="hostel_info">
            <div className="info_item">
              <MapPin size={16} className="info-icon" />
              <span>{hostel?.campus?.campus || "Unknown Campus"}</span>
            </div>
            <div className="info_item">
              <Users size={16} className="info-icon" />
              <span>{room_details.length} Room Types Available</span>
            </div>
            <div className="room_details">
              {room_details.slice(0, 2).map((room) => (
                <div key={room.uuid || room.number_in_room} className="room_item">
                  {room.number_in_room} in Room
                </div>
              ))}
              {room_details.length > 2 && (
                <div className="more_rooms">+{room_details.length - 2} more</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostelCard;
