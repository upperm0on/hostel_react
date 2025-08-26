import "../../assets/css/dashboard/YesHostel.css";
import HostelCard from "./HostelCard";
import ManagerInfo from "./ManagerInfo";
import BookingInfo from "./BookingInfo";

function YesHostel() {
  // Static hostel info
  return (
    <div className="hostel_dashboard_space">
        <div className="details_side">
            <ManagerInfo />
            <BookingInfo />
        </div>
        <HostelCard />
    </div>
  );
}

export default YesHostel;
