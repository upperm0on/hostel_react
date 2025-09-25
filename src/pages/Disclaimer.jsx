import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Disclaimer() {
  return (
    <>
      <NavBar />
      <div className="document_container" style={{ paddingTop: 90, paddingBottom: 40, maxWidth: 1000, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <h1 style={{ marginBottom: 12 }}>Disclaimer</h1>
        <p style={{ marginBottom: 16 }}>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>No Professional Advice</h2>
        <p>Content on HostelHQ is for general information only and does not constitute legal, financial, or housing advice. Verify details independently before making decisions.</p>

        <h2>Listings and Availability</h2>
        <p>Hostel data (availability, amenities, pricing, images) is provided by partners and may change or contain errors. We do not guarantee accuracy or completeness.</p>

        <h2>Third‑Party Links</h2>
        <p>Links to third‑party websites or services are provided for convenience. We are not responsible for their content, policies, or practices.</p>

        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, HostelHQ is not liable for any loss or damage arising from your use of the site, including reliance on information presented.</p>
      </div>
      <Footer />
    </>
  );
}

export default Disclaimer;


