import { useState } from "react";
import "../../assets/css/hostel/HostelCard.css";
import DetailPopup from "./DetailPopup";

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
        </div>
        <div className="hostel_details">
          <ul className="details1">
            <li className="details1-item">Name: {hostel?.name || "Unknown"}</li>
            <li className="details1-item">Rating: {hostel?.rating ?? "N/A"}</li>
          </ul>
          <ul className="details2">
            {room_details.map((room, i) => (
              <li key={i} className="details2-item">
                {room.number_in_room} in Room
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default HostelCard;
