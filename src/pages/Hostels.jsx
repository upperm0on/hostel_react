import CategoryHostel from "../components/hostel/CategoryHostel";
import DetailPopup from "../components/hostel/DetailPopup";

function Hostels() {
    return (
        <>
            <CategoryHostel />
            <DetailPopup />
            <script src="https://js.paystack.co/v1/inline.js"></script>
        </>
    );
}

export default Hostels;