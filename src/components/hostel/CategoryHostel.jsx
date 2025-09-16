import { useEffect, useState, useRef } from "react";
import "../../assets/css/hostel/CategoryHostel.css";
import HostelCard from "./HostelCard";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CategoryHostel() {
  const [hostels_data, setHostelsData] = useState([]);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -280,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getHostels() {
      try {
        // Try a simple fetch without custom headers to test CORS
        const response = await fetch(buildApiUrl(API_ENDPOINTS.HOSTELS), {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const hostels = await response.json();
        console.log("Hostel Data:", hostels);
        setHostelsData(hostels); // Store in state
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    }

    getHostels(); // Call the function when component mounts
  }, []);

  
  
  return (
    <>
      <div className="category_section">
        <div className="category_header">
          <h2 className="category_name">Available Hostels</h2>
        </div>
        <div className="category_container">
          <button className="nav_button nav_left" onClick={scrollLeft}>
            <ChevronLeft size={20} />
          </button>
          <div className="category_list" ref={scrollContainerRef}>
            {hostels_data.map((hostel, index) => (
              <HostelCard key={index} hostel={hostel} />
            ))}
          </div>
          <button className="nav_button nav_right" onClick={scrollRight}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryHostel;
