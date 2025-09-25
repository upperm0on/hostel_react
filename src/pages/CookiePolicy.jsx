import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function CookiePolicy() {
  return (
    <>
      <NavBar />
      <div className="document_container" style={{ paddingTop: 90, paddingBottom: 40, maxWidth: 1000, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <h1 style={{ marginBottom: 12 }}>Cookie Policy</h1>
        <p>Details on how and why we use cookies.</p>
      </div>
      <Footer />
    </>
  );
}

export default CookiePolicy;


