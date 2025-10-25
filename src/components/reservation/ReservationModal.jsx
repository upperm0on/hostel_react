import React, { useState } from 'react';
import { X, Mail, DollarSign, AlertCircle } from 'lucide-react';
import '../../assets/css/reservation/ReservationModal.css';

function ReservationModal({ isOpen, onClose, onSubmit, roomDetails, hostel, error }) {
  const [formData, setFormData] = useState({
    email: localStorage.getItem('email') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Reservation submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const depositAmount = Math.round(roomDetails.price * 0.3);
  const remainingAmount = roomDetails.price - depositAmount;

  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
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
                <DollarSign size={16} />
                <span>Total Amount: {roomDetails.price.toLocaleString()}</span>
              </div>
              <div className="pricing-item deposit">
                <DollarSign size={16} />
                <span>Deposit (30%): {depositAmount.toLocaleString()}</span>
              </div>
              <div className="pricing-item remaining">
                <DollarSign size={16} />
                <span>Remaining: {remainingAmount.toLocaleString()}</span>
              </div>
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
                value={formData.email}
                onChange={handleInputChange}
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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Pay Deposit (${depositAmount.toLocaleString()})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;