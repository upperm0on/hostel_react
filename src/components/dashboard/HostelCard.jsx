import RoomCard from "./RoomCard";
import { Building2, BarChart3, Users, MapPin, Sparkles } from "lucide-react";
import "../../assets/css/dashboard/HostelCard.css";

function HostelCard() {
  const hostel = JSON.parse(localStorage.getItem("information"));
  // Get booked room
  const bookedRoom = localStorage.getItem("room_booked");


  // Parse room details properly
  const room_details_parsed = Array.isArray(hostel.room_details)
    ? hostel.room_details
    : (typeof hostel.room_details === 'string'
        ? (() => { try { return JSON.parse(hostel.room_details || '[]'); } catch { return []; } })()
        : []);

  const cleanedBookedRoom = bookedRoom.replace(/"/g, ""); // removes extra quotes

  let passing_room = null;

  room_details_parsed.forEach((room) => {
    // Try to match by UUID first, then fall back to number_in_room for backward compatibility
    if (room.uuid === cleanedBookedRoom || String(room.number_in_room) === cleanedBookedRoom) {
      passing_room = room;
    }
  });

  // Safe parsing for additional_details
  let additionalDetails = [];
  if (hostel.additional_details) {
    // If it's already an array, use it directly
    if (Array.isArray(hostel.additional_details)) {
      additionalDetails = hostel.additional_details;
    } else if (typeof hostel.additional_details === 'string') {
      // Try parsing as JSON first
      try {
        const parsed = JSON.parse(hostel.additional_details);
        additionalDetails = Array.isArray(parsed) ? parsed : [];
      } catch {
        // If JSON parsing fails, try splitting comma-separated string
        additionalDetails = hostel.additional_details.split(',').map(item => item.trim()).filter(item => item);
      }
    }
  }

  const base_url = "/";

  return (
    <div className="dashboard_card">
      {/* Image */}
      <div className="image">
        <img src={base_url + hostel.image} alt={hostel.name} />
        <div className="hostel_location">
          <MapPin size={16} />
          {hostel.campus?.campus || "Unknown Campus"}
        </div>
      </div>

      {/* Hostel Details */}
      <div className="hostel_details">
        <ul className="details_hostel">
          <li className="details_hostel_item">
            <strong><Building2 size={16} /> Hostel:</strong> {hostel.name}
          </li>
          <li className="details_hostel_item">
            <strong><BarChart3 size={16} /> Status:</strong> {hostel.status}
          </li>
          <li className="details_hostel_item">
            <strong><Users size={16} /> Gender Type:</strong> {hostel.gender_type}
          </li>
        </ul>

        {/* Additional Details */}
        <div className="grided-content">
          {additionalDetails.length > 0 && (
            <div className="additional_details">
              <h4><Sparkles size={20} /> General Amenities</h4>
              <ul>
                {additionalDetails.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default HostelCard;
