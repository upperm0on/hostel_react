import React, { useState } from 'react';
import { Calendar, CreditCard, Loader2, RotateCcw } from 'lucide-react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';
import ReservationModal from './ReservationModal';
import ChangeReservationModal from './ChangeReservationModal';
import '../../assets/css/reservation/ReservationButton.css';

function ReservationButton({ roomDetails, hostel, isAvailable, onReservationSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user has an existing reservation
  const hasExistingReservation = () => {
    const reservationData = localStorage.getItem("reservation_data");
    return reservationData && reservationData !== "null" && reservationData !== "{}";
  };

  const handleReservationClick = () => {
    if (!isAvailable) return;
    
    if (hasExistingReservation()) {
      setIsChangeModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
    setError(null);
  };

  const handleReservationSubmit = async (reservationData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to make a reservation');
      }

      // Create reservation
      const createRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          hostel_id: hostel.id,
          reservee_date: new Date().toISOString().split('T')[0], // Use current date as default
          room_uuid: roomDetails.uuid,
          amount: roomDetails.price,
        }),
      });

      if (!createRes.ok) {
        const errorData = await createRes.json();
        throw new Error(errorData.detail || 'Failed to create reservation');
      }

      const reservation = await createRes.json();

      // Initiate payment for deposit
      const paymentRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_PAYMENT_INITIATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          reservation_id: reservation.id,
          email: reservationData.email,
          deposit_percentage: 30, // 30% deposit
        }),
      });

      if (!paymentRes.ok) {
        const errorData = await paymentRes.json();
        throw new Error(errorData.detail || 'Failed to initiate payment');
      }

      const paymentData = await paymentRes.json();

      // Redirect to Paystack payment
      window.location.href = paymentData.authorization_url;

    } catch (err) {
      console.error('Reservation error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeReservationSubmit = async (newRoomDetails) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to change your reservation');
      }

      // Get current reservation data
      const currentReservation = JSON.parse(localStorage.getItem("reservation_data") || "{}");
      
      // Create new reservation
      const createRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization `Token ${token}`,
        },
        body: JSON.stringify({
          hostel_id: hostel.id,
          reservee_date: new Date().toISOString().split('T')[0],
          room_uuid: newRoomDetails.uuid,
          amount: newRoomDetails.price,
        }),
      });

      if (!createRes.ok) {
        const errorData = await createRes.json();
        throw new Error(errorData.detail || 'Failed to create new reservation');
      }

      const newReservation = await createRes.json();

      // Initiate payment for new deposit
      const paymentRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_PAYMENT_INITIATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          reservation_id: newReservation.id,
          email: localStorage.getItem('email') || '',
          deposit_percentage: 30, // 30% deposit
        }),
      });

      if (!paymentRes.ok) {
        const errorData = await paymentRes.json();
        throw new Error(errorData.detail || 'Failed to initiate payment');
      }

      const paymentData = await paymentRes.json();

      // Redirect to Paystack payment
      window.location.href = paymentData.authorization_url;

    } catch (err) {
      console.error('Change reservation error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentReservation = () => {
    try {
      return JSON.parse(localStorage.getItem("reservation_data") || "{}");
    } catch {
      return {};
    }
  };

  return (
    <>
      <button
        type="button"
        className={`reservation-btn ${hasExistingReservation() ? 'change-reservation' : ''}`}
        onClick={handleReservationClick}
        disabled={!isAvailable || isLoading}
        aria-disabled={!isAvailable || isLoading}
        title={isAvailable ? (hasExistingReservation() ? "Change your reservation (no refund)" : "Reserve this room with deposit") : "Room not available"}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isAvailable ? (
          hasExistingReservation() ? <RotateCcw size={18} /> : <Calendar size={18} />
        ) : (
          <CreditCard size={18} />
        )}
        <span>
          {isLoading 
            ? "Processing..." 
            : isAvailable 
              ? (hasExistingReservation() ? "Change Reservation" : "Reserve Room")
              : "Not Available"
          }
        </span>
      </button>

      {isModalOpen && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReservationSubmit}
          roomDetails={roomDetails}
          hostel={hostel}
          error={error}
        />
      )}

      {isChangeModalOpen && (
        <ChangeReservationModal
          isOpen={isChangeModalOpen}
          onClose={() => setIsChangeModalOpen(false)}
          onSubmit={handleChangeReservationSubmit}
          roomDetails={roomDetails}
          hostel={hostel}
          currentReservation={getCurrentReservation()}
          error={error}
        />
      )}
    </>
  );
}

export default ReservationButton;
