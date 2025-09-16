import { useEffect, useState } from "react";
import "../assets/css/DetailedSearch/DetailedSearch.css";

import HostelCard from "../components/hostel/HostelCard";
import NavBar from "../components/NavBar";
import SideBarNav from "../components/DetailedSearch/SideBarNav";

function DetailedSearch() {
  const [initialHostels, setInitialHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);

  const [roomTypes, setRoomTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Load initial data
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("search_data")) || {
        data: [],
      };
      const hostels = data.data || [];

      setInitialHostels(hostels);
      setFilteredHostels(hostels);

      // Collect unique room types & amenities
      const roomSet = new Set();
      const amenitySet = new Set();

      hostels.forEach((hostel) => {
        if (hostel.room_details) {
          JSON.parse(hostel.room_details).forEach((room) => {
            if (room.number_in_room) roomSet.add(room.number_in_room);
          });
        }
        if (hostel.additional_details) {
          JSON.parse(hostel.additional_details).forEach((a) =>
            amenitySet.add(a)
          );
        }
      });

      setRoomTypes(Array.from(roomSet));
      setAmenities(Array.from(amenitySet));
    } catch (e) {
      console.error("Error parsing initial hostel data:", e);
      setInitialHostels([]);
      setFilteredHostels([]);
    }
  }, []);

  // Re-filter whenever filters change
  useEffect(() => {
    if (!initialHostels.length) return;

    const filtered = initialHostels.filter((hostel) => {
      let matchesRoom = true;
      let matchesAmenities = true;

      if (selectedRoomType) {
        const rooms = JSON.parse(hostel.room_details || "[]");
        matchesRoom = rooms.some(
          (r) => r.number_in_room.toString() === selectedRoomType
        );
      }

      if (selectedAmenities.length > 0) {
        const hostelAmenities = JSON.parse(hostel.additional_details || "[]");
        matchesAmenities = selectedAmenities.every((a) =>
          hostelAmenities.includes(a)
        );
      }

      return matchesRoom && matchesAmenities;
    });

    setFilteredHostels(filtered);
  }, [selectedRoomType, selectedAmenities, initialHostels]);

  return (
    <>
      <NavBar />
      <div className="document_container">
        <div className="side_bar">
          <SideBarNav
            roomTypes={roomTypes}
            amenities={amenities}
            selectedRoomType={selectedRoomType}
            setSelectedRoomType={setSelectedRoomType}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </div>
        <div className="search_results_box">
          {filteredHostels.map((hostel) => (
            <HostelCard hostel={hostel} key={hostel.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailedSearch;
