import "../../assets/css/hostel/DetailRoom.css";

function DetailRoom({ room_details, hostel }) {
  const amenities = JSON.parse(room_details["amenities"]);

  const genderKeys = Object.keys(room_details.gender);

  const base_image_url = 'http://localhost:8080/media/room_images'
  
//   const handler = window.PaystackPop.setup({
//     key: publicKey, // public key only
//     email: "customer@example.com",
//     amount: 5000, // in kobo (50.00 GHS)
//     currency: "GHS",
//     ref: `ref-${Date.now()}`, // unique transaction reference
//     callback: function(response) {
//       // Payment was successful
//       console.log("Payment success", response);
//       // Send the reference to your backend for verification
//       fetch("/api/verify-payment/", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({reference: response.reference})
//       });
//     },
//     onClose: function() {
//       console.log("Payment closed");
//     }
//   });

//   handler.openIframe();
// };

const token = localStorage.getItem('token');

    const handlePayment = async () => {
  try {
    // Call your backend to initiate payment
    const res = await fetch(`http://localhost:8080/hq/api/payments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Token ${token} ` },
      body: JSON.stringify({ room_id: room_details.id })
    });
    const data = await res.json();
    
    console.log(data)

    const handler = window.PaystackPop.setup({
      key: data.public_key,
      email: data.email,
      amount: parseFloat(room_details['price']) * 100,
      currency: "GHS",
      ref: `ref-${Date.now()}`,
      callback: async (response) => {
        const reference = `${Date.now()}`;
        // Send reference to backend for verification
        await fetch("/api/verify-payment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: `${reference}`, room_id: room_details.id })
        });
        alert("Payment verified successfully!");
      },
      onClose: function() {
        console.log("Payment closed");
      }
    });

    handler.openIframe();
  } catch (err) {
    console.error(err);
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
        <button type="button" className="booking_btn" onClick={handlePayment}>Book Room</button>

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
