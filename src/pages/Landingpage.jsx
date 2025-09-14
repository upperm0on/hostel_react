import NavBar from "../components/NavBar";
import CardContainer from "../components/landingpage/CardContainer";
import Footer from "../components/Footer";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";


function Landingpage() {

  const token = localStorage.getItem('token');
  
  async function get_username() {
      const res = await fetch(buildApiUrl(API_ENDPOINTS.LANDING_PAGE), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      });
      const data = await res.json();

      localStorage.setItem('name', data.username)
      
    };

  get_username()
    
  return (
    <>
      <NavBar />
      <CardContainer />
      <Footer />
    </>
  );
}

export default Landingpage;
