import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function TermsOfService() {
  return (
    <>
      <NavBar />
      <div className="document_container" style={{ paddingTop: 90, paddingBottom: 40, maxWidth: 1000, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <h1 style={{ marginBottom: 12 }}>Terms of Service</h1>
        <p>The rules that govern your use of HostelHQ.</p>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfService;


