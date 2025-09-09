import "../../assets/css/hostel/DetailRoom.css";

function DetailRoom({ room_details, hostel }) {
  const amenities = JSON.parse(room_details["amenities"]);

  const genderKeys = Object.keys(room_details.gender);

  const base_image_url = "/media/room_images";

  const token = localStorage.getItem("token");
  const handlePayment = async () => {
    try {
      // Initiate payment on backend
      const res = await fetch("/hq/api/payments/", {
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
      const paystackRes = await fetch("/hq/api/payments/verify/", {
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
    <div className="room-container">
      <div className="image-container">
        <img
          src={`${base_image_url}/${hostel.name}/${room_details.number_in_room}/${room_details.room_image}`}
          alt="room_image"
        />
      </div>
      <ul className="room_details">
        <li className="room_detail_item">
          Number in Room: <span>{room_details["number_in_room"]}</span>
        </li>
        <li className="room_detail_item">
          Price: <span>{room_details["price"]}</span>$
        </li>
        <li className="room_detail_item">
          {genderKeys.length > 1
            ? "Mixed"
            : genderKeys[0].charAt(0).toUpperCase() + genderKeys[0].slice(1)}
        </li>
        <button type="button" className="booking_btn" onClick={handlePayment}>
          Book Room
        </button>
      </ul>
      <ul className="amenities">
        <h3 className="title">Room Amenities</h3>
        {amenities.map((amenity, key) => {
          return (
            <li className="amenity-item" key={key}>
              {amenity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DetailRoom;
