import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, User, Menu, X, LogOut, Search } from "lucide-react";
import "../assets/css/NavBar.css";
import LogoutConfirm from "./LogoutConf";
import { useNavigate } from "react-router-dom";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";

function NavBar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("name"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Keep state in sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("name"));
    };

    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("name"));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const safelyParseAmenities = (value) => {
    try {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        }
        return trimmed
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      }
      return [];
    } catch {
      return [];
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchText.trim().toLowerCase();
    if (!query) return;
    setIsSearching(true);

    try {
      // Use locally cached hostels; fall back to empty array
      const cached = (() => {
        try {
          return JSON.parse(localStorage.getItem("all_hostels")) || [];
        } catch {
          return [];
        }
      })();

      const filtered = (Array.isArray(cached) ? cached : []).filter((h) => {
        const nameMatch = (h?.name || "").toLowerCase().includes(query);
        const campusMatch = (h?.campus?.campus || "").toLowerCase().includes(query);
        const amenities = safelyParseAmenities(h?.additional_details);
        const amenitiesMatch = amenities.some((a) => a.toLowerCase().includes(query));
        return nameMatch || campusMatch || amenitiesMatch;
      });

      localStorage.setItem("search_data", JSON.stringify({ data: filtered }));
      navigate("/detailed_search");
    } catch (err) {
      console.error("Navbar search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img src="/images/logo.svg" alt="HostelHQ Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <form className="nav-search" onSubmit={handleSearchSubmit} role="search">
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search hostels or amenities"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search hostels"
              />
              <button className="nav-search-btn" type="submit" disabled={isSearching}>
                <Search size={16} />
                <span>{isSearching ? "Searching..." : "Search"}</span>
              </button>
            </form>
            <ul className="nav-links">
              <li className="nav-links-item">
                <Link to="/hostels" className="nav-link">
                  <div className="icon-container">
                    <Building2 size={20} />
                  </div>
                  Hostels
                </Link>
              </li>
            </ul>

            {token ? (
              <div className="buttons_united">
                <div className="nav-links-item">
                  <Link to="/dashboard" className="nav-link">
                    <div className="button_img">
                      <User size={18} /> {username}
                    </div>
                  </Link>
                </div>
                <div className="nav-links-item logout-item">
                  <LogoutConfirm>
                    <div className="logout-button">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </LogoutConfirm>
                </div>
              </div>
            ) : (
              <ul className="login-buttons">
                <li className="nav-links-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar - Completely Independent */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-backdrop" onClick={closeMobileMenu}></div>
        <div className="drawer-panel">
          <div className="drawer-header">
            <div className="drawer-brand">
              <img src="/images/logo.svg" alt="HostelHQ Logo" />
            </div>
            <button className="drawer-close-btn" onClick={closeMobileMenu}>
              <X size={20} />
            </button>
          </div>
          
          <div className="drawer-body">
            <form className="drawer-search" onSubmit={(e) => { handleSearchSubmit(e); closeMobileMenu(); }} role="search">
              <input
                type="text"
                className="drawer-search-input"
                placeholder="Search hostels or amenities"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search hostels"
              />
              <button className="drawer-search-btn" type="submit" disabled={isSearching}>
                <Search size={16} />
                <span>{isSearching ? "Searching..." : "Search"}</span>
              </button>
            </form>
            <div className="drawer-menu">
              <div className="drawer-menu-item">
                <Link to="/hostels" className="drawer-menu-link" onClick={closeMobileMenu}>
                  <div className="drawer-menu-icon">
                    <Building2 size={20} />
                  </div>
                  <span className="drawer-menu-text">Hostels</span>
                </Link>
              </div>
            </div>

            {token ? (
              <div className="drawer-user-menu">
                <div className="drawer-menu-item">
                  <Link to="/dashboard" className="drawer-menu-link" onClick={closeMobileMenu}>
                    <div className="drawer-menu-icon">
                      <User size={20} />
                    </div>
                    <span className="drawer-menu-text">Dashboard</span>
                  </Link>
                </div>
                <div className="drawer-menu-item">
                  <LogoutConfirm>
                    <div className="drawer-menu-link drawer-logout-link">
                      <div className="drawer-menu-icon">
                        <LogOut size={20} />
                      </div>
                      <span className="drawer-menu-text">Logout</span>
                    </div>
                  </LogoutConfirm>
                </div>
              </div>
            ) : (
              <div className="drawer-auth-menu">
                <div className="drawer-menu-item">
                  <Link to="/signup" className="drawer-menu-link" onClick={closeMobileMenu}>
                    <div className="drawer-menu-icon">
                      <User size={20} />
                    </div>
                    <span className="drawer-menu-text">Sign Up</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
