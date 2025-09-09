import RoomCard from "./RoomCard";
import "../../assets/css/dashboard/HostelCard.css";

function HostelCard() {
  const hostel = JSON.parse(localStorage.getItem("information"));
  // Get booked room
  const bookedRoom = localStorage.getItem("room_booked");

  console.log(typeof bookedRoom);

  // Parse room details properly
  const room_details_parsed = hostel.room_details
    ? JSON.parse(hostel.room_details)
    : [];

  const cleanedBookedRoom = bookedRoom.replace(/"/g, ""); // removes extra quotes

  let passing_room = null;

  room_details_parsed.forEach((room) => {
    if (String(room.number_in_room) === cleanedBookedRoom) {
      passing_room = room;
    } else {
      null;
    }
  });

  const additionalDetails = hostel.additional_details
    ? JSON.parse(hostel.additional_details)
    : [];

  const base_url = "/";

  return (
    <div className="dashboard_card">
      {/* Image */}
      <div className="image">
        <img src={base_url + hostel.image} alt={hostel.name} />
        <div className="hostel_location">
          {/* <span><img src="#" alt="location_icon" /></span> */}
          {hostel.campus?.campus || "Unknown Campus"}
        </div>
      </div>

      {/* Hostel Details */}
      <div className="hostel_details">
        <ul className="details_hostel">
          <li className="details_hostel_item">
            <strong>Hostel:</strong> {hostel.name}
          </li>
          <li className="details_hostel_item">
            <strong>Rooms:</strong> {hostel.status}
          </li>
        </ul>

        {/* Additional Details */}
        <div className="grided-content">
          {additionalDetails.length > 0 && (
            <div className="additional_details">
              <h4>General Amenities</h4>
              <ul>
                {additionalDetails.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          {/* Room Details */}
          <div className="room_details">
            <h4>Your Room</h4>
            <RoomCard room={passing_room} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelCard;
