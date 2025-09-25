import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function CookiePolicy() {
  return (
    <>
      <NavBar />
      <div className="document_container" style={{ paddingTop: 90, paddingBottom: 40, maxWidth: 1000, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <h1 style={{ marginBottom: 12 }}>Cookie Policy</h1>
        <p style={{ marginBottom: 16 }}>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device by your browser. We also use similar technologies like local storage and pixels.</p>

        <h2>How We Use Cookies</h2>
        <ul>
          <li>Essential: enable core features such as authentication and security.</li>
          <li>Preferences: remember settings like campus filters and UI choices.</li>
          <li>Analytics: help us understand usage to improve performance.</li>
          <li>Marketing (where applicable): measure campaign effectiveness.</li>
        </ul>

        <h2>Your Choices</h2>
        <ul>
          <li>Browser controls: block or delete cookies via your browser settings.</li>
          <li>Consent: in regions where required, you can manage optional cookies via our banner or settings.</li>
        </ul>

        <h2>Retention</h2>
        <p>Cookie lifetimes vary. Session cookies expire when you close your browser. Persistent cookies remain until they expire or are deleted.</p>

        <h2>Third‑Party Cookies</h2>
        <p>Some features may rely on third parties (e.g., analytics, payment). These parties may set their own cookies subject to their policies.</p>

        <h2>Updates</h2>
        <p>We may update this Cookie Policy to reflect changes in technology or law. Revisit this page periodically.</p>
      </div>
      <Footer />
    </>
  );
}

export default CookiePolicy;


