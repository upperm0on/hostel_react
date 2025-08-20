import NavBar from "../components/NavBar";
import CardContainer from "../components/landingpage/CardContainer";
import Footer from "../components/Footer";


function Landingpage() {

  const token = localStorage.getItem('token');
  
  async function get_username() {
      const res = await fetch("http://localhost:8080/hq/api/landing_page/", {
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
      <CardContainer />
    </>
  );
}

export default Landingpage;
