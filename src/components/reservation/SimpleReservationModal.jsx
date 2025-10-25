import React, { useState } from 'react';
import { X, Mail, AlertCircle, RotateCcw } from 'lucide-react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';
import ChangeReservationModal from './ChangeReservationModal';
import '../../assets/css/reservation/ReservationModal.css';
import { useReservationData } from '../../hooks/useReservationData';
import { useAuthData } from '../../hooks/useAuthData';
import { calculateRoomAvailability } from '../../utils/availabilityUtils';

function SimpleReservationModal({ isOpen, onClose, roomDetails, hostel }) {
  const { email: userEmail, token } = useAuthData();
  const { hasReservation, reservation, allReservations } = useReservationData();
  const [email, setEmail] = useState(userEmail || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  // Check if user has an existing reservation using Redux
  const hasExistingReservation = () => hasReservation;

  const getCurrentReservation = () => reservation || {};

  // Calculate room availability (with null check)
  const roomAvailability = roomDetails ? calculateRoomAvailability(roomDetails, allReservations || []) : {
    totalCapacity: 0,
    currentOccupants: 0,
    reservedSlots: 0,
    availableSlots: 0,
    isAvailable: false,
    occupancyRate: 0
  };
  const isRoomAvailable = roomAvailability.isAvailable;

  const handleChangeReservationSubmit = async (newRoomDetails) => {
    setIsLoading(true);
    setError(null);

    if (!token) {
      setError('Please log in to change your reservation');
      setIsLoading(false);
      return;
    }

    try {

      // First, get current user's reservations from API
      const reservationsRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_LIST), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (!reservationsRes.ok) {
        throw new Error('Failed to fetch current reservations');
      }

      const reservationsData = await reservationsRes.json();
      
      if (!reservationsData.reservations || reservationsData.reservations.length === 0) {
        throw new Error('No current reservation found');
      }

      // Get the most recent reservation
      const currentReservation = reservationsData.reservations[0];
      console.log('Current reservation from API:', currentReservation);

      // First, delete the existing reservation
      const deleteUrl = buildApiUrl(`${API_ENDPOINTS.RESERVATIONS_DELETE}${currentReservation.id}/`);
      console.log('Delete URL:', deleteUrl);
      
      const deleteRes = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (!deleteRes.ok) {
        const errorData = await deleteRes.json().catch(() => ({}));
        console.error('Delete reservation error:', errorData);
        throw new Error(errorData.detail || 'Failed to cancel existing reservation');
      }

      // Create new reservation
      const createRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
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

      // Update localStorage with new reservation data
      localStorage.setItem('reservation_data', JSON.stringify(newReservation));

      // Get user email from localStorage
      const userEmail = localStorage.getItem('email') || '';
      console.log('User email for payment:', userEmail);
      
      if (!userEmail) {
        throw new Error('User email not found. Please log in again.');
      }

      // Initiate payment for new deposit
      const paymentRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_PAYMENT_INITIATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          reservation_id: newReservation.id,
          email: userEmail,
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

  if (!isOpen || !roomDetails || !hostel) return null;

  // If user has existing reservation, show change modal instead
  if (hasExistingReservation()) {
    return (
      <ChangeReservationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleChangeReservationSubmit}
        roomDetails={roomDetails}
        hostel={hostel}
        currentReservation={getCurrentReservation()}
        error={error}
      />
    );
  }

  const depositAmount = Math.round(roomDetails.price * 0.3);
  const remainingAmount = roomDetails.price - depositAmount;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reservation form submitted:', { token, email, roomDetails, hostel });
    setIsLoading(true);
    setError(null);

    if (!token) {
      setError('Please log in to make a reservation');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Creating reservation with data:', {
        hostel_id: hostel.id,
        reservee_date: new Date().toISOString().split('T')[0],
        room_uuid: roomDetails.uuid,
        amount: roomDetails.price,
      });

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

      console.log('Create reservation response:', createRes.status, createRes.statusText);

      if (!createRes.ok) {
        const errorData = await createRes.json();
        console.error('Create reservation error:', errorData);
        throw new Error(errorData.detail || 'Failed to create reservation');
      }

      const reservation = await createRes.json();
      console.log('Reservation created successfully:', reservation);

      // Initiate payment for deposit
      console.log('Initiating payment with data:', {
        reservation_id: reservation.id,
        email: email,
        deposit_percentage: 30,
      });

      const paymentRes = await fetch(buildApiUrl(API_ENDPOINTS.RESERVATIONS_PAYMENT_INITIATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          reservation_id: reservation.id,
          email: email,
          deposit_percentage: 30, // 30% deposit
        }),
      });

      console.log('Payment initiation response:', paymentRes.status, paymentRes.statusText);

      if (!paymentRes.ok) {
        const errorData = await paymentRes.json();
        console.error('Payment initiation error:', errorData);
        throw new Error(errorData.detail || 'Failed to initiate payment');
      }

      const paymentData = await paymentRes.json();
      console.log('Payment data received:', paymentData);

      // Redirect to Paystack payment
      console.log('Redirecting to payment URL:', paymentData.authorization_url);
      window.location.href = paymentData.authorization_url;

    } catch (err) {
      console.error('Reservation error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if roomDetails is null
  if (!roomDetails) {
    return null;
  }

  return (
    <div className="reservation-modal-overlay" onClick={handleOverlayClick}>
      <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reservation-modal-header">
          <h3 className="reservation-modal-title">Reserve Room</h3>
          <button 
            className="reservation-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="reservation-modal-content">
          <div className="reservation-info">
            <h4 className="reservation-room-title">Room {roomDetails.number_in_room}</h4>
            <p className="reservation-hostel-name">{hostel.name}</p>
            
            <div className="reservation-pricing">
              <div className="pricing-item">
                <span>Total Amount: {roomDetails.price.toLocaleString()}</span>
              </div>
              <div className="pricing-item deposit">
                <span>Deposit (30%): {depositAmount.toLocaleString()}</span>
              </div>
              <div className="pricing-item remaining">
                <span>Remaining: {remainingAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="reservation-availability">
              <div className="availability-info">
                <span className="availability-label">Availability:</span>
                <span className={`availability-status ${isRoomAvailable ? 'available' : 'unavailable'}`}>
                  {isRoomAvailable 
                    ? `${roomAvailability.availableSlots} slot${roomAvailability.availableSlots > 1 ? 's' : ''} available`
                    : 'Fully booked'
                  }
                </span>
              </div>
              {!isRoomAvailable && (
                <div className="availability-warning">
                  <AlertCircle size={16} />
                  <span>This room is currently fully booked and not available for reservation.</span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="reservation-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="reservation-terms">
              <p className="terms-text">
                By reserving this room, you agree to pay a 30% deposit now. The reservation period will be set by the hostel manager. 
                Your reservation will expire if not completed within the manager-specified timeframe, and no refunds will be provided.
              </p>
            </div>

            <div className="reservation-modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || !isRoomAvailable}
                title={!isRoomAvailable ? 'Room is not available for reservation' : ''}
              >
                {isLoading ? 'Processing...' : !isRoomAvailable ? 'Room Not Available' : `Pay Deposit (${depositAmount.toLocaleString()})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SimpleReservationModal;
