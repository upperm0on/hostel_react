import React, { useEffect, useState } from "react";
import NoHostel from "../components/dashboard/NoHostel";
import YesHostel from "../components/dashboard/YesHostel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [hasHostel, setHasHostel] = useState(null);

  const get_consumer = async () => {
    try {
      const res = await fetch(
        buildApiUrl(API_ENDPOINTS.CONSUMER_REQUEST),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      localStorage.setItem('information', JSON.stringify(data.data))
      localStorage.setItem('room_booked', JSON.stringify(data.room))
      setHasHostel(data.stat === "True");
    } catch (error) {
      console.error("Error fetching consumer data:", error);
      setHasHostel(false);
    }
  };

  useEffect(() => {
    get_consumer();
  }, []);

  return (
    <div>
      <NavBar />
      {hasHostel === null ? (
        <div>Loading...</div>
      ) : hasHostel ? (
        <YesHostel />
      ) : (
        <NoHostel />
      )}
      <Footer />
    </div>
  );
}

export default Dashboard;