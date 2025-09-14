import "../../assets/css/hostel/DetailRoom.css";
import { buildApiUrl, buildMediaUrl, API_ENDPOINTS } from "../../config/api";
import { Users, DollarSign, Bed, Wifi, Car, Shield, Utensils, Dumbbell, CheckCircle, CreditCard } from "lucide-react";

function DetailRoom({ room_details, hostel }) {
  const amenities = JSON.parse(room_details["amenities"]);

  const genderKeys = Object.keys(room_details.gender);

  const base_image_url = buildMediaUrl("/media/room_images");

  const token = localStorage.getItem("token");
  const handlePayment = async () => {
    try {
      // Initiate payment on backend
      const res = await fetch(buildApiUrl(API_ENDPOINTS.PAYMENTS), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ 
          room_id: room_details.id,
          room_number: room_details.number_in_room,
        }),
      });
      const backendData = await res.json();

      // Initialize Paystack transaction
      const paystackRes = await fetch(buildApiUrl(API_ENDPOINTS.PAYMENT_VERIFY), {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`, // Replace with your actual secret key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: backendData.email,
          amount: room_details.price * 100, // Ensure this is in kobo (multiply by 100 if needed)
          callback_url: "/dashboard/",
          hostel_id: hostel.id,
          room_number: room_details.number_in_room,
        }),
      });

      const response = await paystackRes.json();
      window.open(response.authorization_url, "_blank");

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="room-card">
      <div className="room-image-container">
        <img
          src={`${base_image_url}/${hostel.name}/${room_details.number_in_room}/${room_details.room_image}`}
          alt="room_image"
        />
        <div className="room-badge">
          <Users size={14} />
          <span>{room_details["number_in_room"]} in Room</span>
        </div>
      </div>
      
      <div className="room-content">
        <div className="room-header">
          <h4 className="room-title">Room {room_details["number_in_room"]}</h4>
          <div className="room-gender">
            <Bed size={16} />
            <span>
              {genderKeys.length > 1
                ? "Mixed"
                : genderKeys[0].charAt(0).toUpperCase() + genderKeys[0].slice(1)}
            </span>
          </div>
        </div>

        <div className="room-pricing">
          <div className="price-container">
            <DollarSign size={20} className="price-icon" />
            <span className="price-amount">{room_details["price"]}</span>
            <span className="price-period">/month</span>
          </div>
        </div>

        <div className="room-amenities">
          <h5 className="amenities-title">Room Amenities</h5>
          <div className="amenities-list">
            {amenities.map((amenity, key) => {
              return (
                <div className="amenity-tag" key={key}>
                  <div className="amenity-icon">
                    {amenity.toLowerCase().includes('wifi') && <Wifi size={14} />}
                    {amenity.toLowerCase().includes('parking') && <Car size={14} />}
                    {amenity.toLowerCase().includes('security') && <Shield size={14} />}
                    {amenity.toLowerCase().includes('kitchen') && <Utensils size={14} />}
                    {amenity.toLowerCase().includes('gym') && <Dumbbell size={14} />}
                    {!amenity.toLowerCase().includes('wifi') && 
                     !amenity.toLowerCase().includes('parking') && 
                     !amenity.toLowerCase().includes('security') && 
                     !amenity.toLowerCase().includes('kitchen') && 
                     !amenity.toLowerCase().includes('gym') && 
                     <CheckCircle size={14} />}
                  </div>
                  <span className="amenity-name">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className="book-room-btn" onClick={handlePayment}>
          <CreditCard size={18} />
          <span>Book This Room</span>
        </button>
      </div>
    </div>
  );
}

export default DetailRoom;
