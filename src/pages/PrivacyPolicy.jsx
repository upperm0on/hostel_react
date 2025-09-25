import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <NavBar />
      <div className="document_container" style={{ paddingTop: 90, paddingBottom: 40, maxWidth: 1000, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <h1 style={{ marginBottom: 12 }}>Privacy Policy</h1>
        <p>Learn how we collect, use, and protect your data.</p>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;


