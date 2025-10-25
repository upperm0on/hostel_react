import "../../assets/css/dashboard/YesHostel.css";
import HostelCard from "./HostelCard";
import ManagerInfo from "./ManagerInfo";
import BookingInfo from "./BookingInfo";
import YourRoom from "./YourRoom";
import RatingReview from "./RatingReview";

function YesHostel() {
  // Check if user has a booking
  const hasBooking = localStorage.getItem("information");
  
  // Get hostel information for the rating component
  const hostelInfo = JSON.parse(localStorage.getItem("information") || "{}");
  const hostelId = hostelInfo?.id;

  return (
    <div className="hostel_dashboard_space">
        <div className="details_side">
            {hasBooking ? <YourRoom /> : null}
            <BookingInfo />
            <ManagerInfo />
        </div>
        <div className="hostel_side">
            <HostelCard />
            {hostelId && <RatingReview hostelId={hostelId} />}
        </div>
    </div>
  );
}

export default YesHostel;
