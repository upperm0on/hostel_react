import { useState } from "react";
import "../../assets/css/hostel/HostelCard.css";
import DetailPopup from "./DetailPopup";
import { Star, Users, MapPin, Eye } from "lucide-react";

function HostelCard({ hostel }) {
  const [open, setOpen] = useState(false);

  // Make sure room_details exists and is an array
  let room_details = [];
  try {
    if (Array.isArray(hostel.room_details)) {
      room_details = hostel.room_details;
    } else if (typeof hostel.room_details === "string") {
      room_details = JSON.parse(hostel.room_details);
    }
  } catch (err) {
    console.error("Error parsing room_details:", err);
  }

  const base_image_url = '/'
  
  return (
    <>
      <DetailPopup
        hostel={hostel}
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className="hostel_card" onClick={() => setOpen(true)}>
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
              <Users size={16} className="info-icon" />
              <span>Rooms Available</span>
            </div>
            <div className="room_details">
              {room_details.slice(0, 2).map((room, i) => (
                <div key={i} className="room_item">
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
