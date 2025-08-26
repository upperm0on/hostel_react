import Footer from "../components/Footer";
import CategoryHostel from "../components/hostel/CategoryHostel";
import DetailPopup from "../components/hostel/DetailPopup";
import NavBar from "../components/NavBar";

function Hostels() {
    return (
        <>
        <NavBar />
            <CategoryHostel />
            <DetailPopup />
            <script src="https://js.paystack.co/v1/inline.js"></script>
            <Footer />
        </>
    );
}

export default Hostels;