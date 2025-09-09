import { useEffect, useState } from "react";
import "../../assets/css/hostel/CategoryHostel.css";
import HostelCard from "./HostelCard";

function CategoryHostel() {
  const [hostels_data, setHostelsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function getHostels() {
      try {
        const response = await fetch("/hq/api/hostels", {
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
      <div className="category_list">
        <p className="category_name">Category Name</p>
        {hostels_data.map((hostel, index) => (
          <HostelCard key={index} hostel={hostel} />
        ))}
      </div>
    </>
  );
}

export default CategoryHostel;
