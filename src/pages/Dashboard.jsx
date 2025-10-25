import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoHostel from "../components/dashboard/NoHostel";
import YesHostel from "../components/dashboard/YesHostel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";
import { checkResponseForUnverifiedAccount, handleUnverifiedAccount } from "../utils/authUtils";

function Dashboard() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [hasHostel, setHasHostel] = useState(null);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const get_consumer = async () => {
    try {
      console.log('Fetching consumer data...');
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
      
      console.log('Consumer API response status:', res.status);
      
      // Check if the response indicates an unverified account
      if (await checkResponseForUnverifiedAccount(res)) {
        handleUnverifiedAccount(email, navigate);
        return;
      }
      
      if (res.status === 404) {
        // No consumer data found - user hasn't booked anything yet
        console.log('No consumer data found, setting hasHostel to false');
        setHasHostel(false);
        return;
      }
      
      if (!res.ok) {
        console.error(`Consumer API error: ${res.status} ${res.statusText}`);
        // If API is not available, assume no hostel
        setHasHostel(false);
        return;
      }
      
      const data = await res.json();
      console.log('Consumer data received:', data);
      localStorage.setItem('information', JSON.stringify(data.data))
      // Store room_uuid if available, otherwise fall back to data.room for backward compatibility
      const roomIdentifier = data.room_uuid || data.room;
      localStorage.setItem('room_booked', JSON.stringify(roomIdentifier))
      const hasHostelValue = data.stat === "True";
      console.log('Setting hasHostel to:', hasHostelValue);
      setHasHostel(hasHostelValue);
    } catch (error) {
      console.error("Error fetching consumer data:", error);
      console.log('Setting hasHostel to false due to error');
      setHasHostel(false);
    }
  };

  const get_reservations = async () => {
    try {
      console.log('Fetching reservations...');
      const res = await fetch(
        buildApiUrl(API_ENDPOINTS.RESERVATIONS_LIST),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      
      console.log('Reservations API response status:', res.status);
      
      if (res.status === 404) {
        // No reservations found
        console.log('No reservations found, setting hasReservation to false');
        setHasReservation(false);
        return;
      }
      
      if (!res.ok) {
        console.error(`Reservations API error: ${res.status} ${res.statusText}`);
        // If API is not available, assume no reservations
        setHasReservation(false);
        return;
      }
      const data = await res.json();
      console.log('Reservations data received:', data);
      
      if (data && data.reservations && data.reservations.length > 0) {
        // Get the most recent reservation
        const latestReservation = data.reservations[0];
        console.log('Setting hasReservation to true, reservation:', latestReservation);
        setReservationData(latestReservation);
        setHasReservation(true);
        
        // Store reservation data in localStorage for components to use
        localStorage.setItem('reservation_data', JSON.stringify(latestReservation));
        
        // Also store hostel information for components that need it
        if (latestReservation.hostel) {
          localStorage.setItem('information', JSON.stringify(latestReservation.hostel));
          localStorage.setItem('room_booked', JSON.stringify(latestReservation.room_uuid || latestReservation.room));
          setHasHostel(true); // Set hasHostel to true since we have hostel data
        }
      } else {
        console.log('No reservations in data, setting hasReservation to false');
        setHasReservation(false);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      console.log('Setting hasReservation to false due to error');
      setHasReservation(false);
    }
  };

  useEffect(() => {
    // Only use reservations API for now since consumer_request is unreliable
    get_reservations();
    // Don't set hasHostel initially - let the reservations API determine this
  }, []);

  // Debug logging
  console.log('Dashboard state:', { hasHostel, hasReservation, reservationData });
  console.log('Dashboard render decision:', {
    hasHostel,
    hasReservation,
    shouldShowYesHostel: hasHostel || hasReservation,
    shouldShowNoHostel: !hasHostel && !hasReservation
  });
  
  // Additional debugging for API state
  console.log('API call states:', {
    consumerAPI: hasHostel !== null ? 'completed' : 'pending',
    reservationsAPI: hasReservation !== undefined ? 'completed' : 'pending'
  });

  return (
    <div>
      <NavBar />
      {hasHostel === null ? (
        <div>Loading...</div>
      ) : hasHostel || hasReservation ? (
        <YesHostel />
      ) : (
        <NoHostel />
      )}
      <Footer />
    </div>
  );
}

export default Dashboard;