import '../../assets/css/dashboard/RoomCard.css';

function RoomCard({ room }) {
  const amenities = room.amenities ? JSON.parse(room.amenities) : [];  
  return (
    <div className="room_card">
      <p>
        <strong>{room.number_in_room} in a room</strong> – <span>GH₵{room.price}</span>
      </p>
      <p>Rooms available: <span>{room.number_of_rooms}</span></p>
      {amenities.length > 0 && (
        <ul>
            <p className="ul_heading">Your Amenities</p>
          {amenities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoomCard;
