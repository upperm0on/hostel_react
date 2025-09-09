import { useState, useEffect } from "react";
import "../../assets/css/landingpage/SearchForm.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

import CampusListDialog from "./CampusListDialog";
import { Navigate } from "react-router-dom";

function SearchForm() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [campusList, setCampusList] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [showCampusDialog, setShowCampusDialog] = useState(false);

  const token = localStorage.getItem("token"); // Ensure token is available

  // Fetch campus list on component mount
  useEffect(() => {
    const fetchCampusList = async () => {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.SEARCH_REQUEST), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch campus list");
        }

        const data = await response.json();
        setCampusList(data); // Assume data = [{id: 1, name: "Campus A"}, ...]
        console.log("Campus list:", data);
      } catch (error) {
        console.error("Error fetching campus list:", error);
        setError("Failed to fetch campus list. Please try again.");
      }
    };

    if (campusList === null) {
      fetchCampusList();
    }
  }, [campusList, token]);

  // Handle input change for location
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setShowCampusDialog(value.length > 0); // Show dialog when typing
  };

  // Handle campus selection from dialog
  const handleCampusSelect = (campus) => {
    setLocation(campus.campus); // Fill input with selected campus
    setShowCampusDialog(false); // Hide dialog
    console.log("Selected campus:", campus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSearchResults(null);

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.SEARCH_REQUEST), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          location: location,
          max_price: price,
          room_type: roomType,
        }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setSearchResults(data);

      // save the fresh results, not the stale state
      localStorage.setItem("search_data", JSON.stringify(data));

      console.log("Saved results:", localStorage.getItem("search_data"));
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please try again.");
    }
  };

  return (
    <div className="search_container">
      <form onSubmit={handleSubmit} className="search_form">
        <div className="search_form_title">Find your perfect Hostel</div>

        {/* Location */}
        <div className="search_form_item first">
          <div className="location-icon-container">
            <img src="/icons/location.svg" alt="" className="location_icon" />
          </div>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Search by Location or Campus"
            id="location"
            autoFocus
          />
        {/* Show campus list dialog when typing */}
        {showCampusDialog && campusList && (
          <CampusListDialog
            campusList={campusList}
            filterText={location}
            onSelect={handleCampusSelect}
          />
        )}

          <button type="submit" className="search_button">
            Search
          </button>
        </div>

        {/* Display error */}
        {error && <div className="error_message">{error}</div>}

        {/* Display search results */}
        {searchResults && (
          <div className="search_results">
            <h3>Search Results:</h3>
            {<Navigate to={"/detailed_search"} />}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchForm;
