import Footer from "../components/Footer";
import CategoryHostel from "../components/hostel/CategoryHostel";
import DetailPopup from "../components/hostel/DetailPopup";
import NavBar from "../components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import "../assets/css/hostel/CategoryHostel.css";

function Hostels() {
    const [q, setQ] = useState("");
    const allHostels = useMemo(() => {
        try { return JSON.parse(localStorage.getItem("all_hostels")) || []; } catch { return []; }
    }, []);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return allHostels;
        const parseAmenities = (value) => {
            try {
                if (!value) return [];
                if (Array.isArray(value)) return value;
                if (typeof value === "string") {
                    const t = value.trim();
                    if (t.startsWith("[") || t.startsWith("{")) {
                        const p = JSON.parse(t);
                        return Array.isArray(p) ? p : [];
                    }
                    return t.split(",").map(v => v.trim()).filter(Boolean);
                }
                return [];
            } catch { return []; }
        };
        return allHostels.filter(h => {
            const nameMatch = (h?.name || "").toLowerCase().includes(query);
            const campusMatch = (h?.campus?.campus || "").toLowerCase().includes(query);
            const amenities = parseAmenities(h?.additional_details);
            const amenityMatch = amenities.some(a => (a || "").toLowerCase().includes(query));
            return nameMatch || campusMatch || amenityMatch;
        });
    }, [q, allHostels]);

    return (
        <>
            <NavBar />
            <div className="hostels_main_container" style={{paddingTop: 90}}>
                <div className="hostels_header">
                    <div className="hostels_main_title">Browse Hostels</div>
                    <div className="hostels_subtitle">Search by name, campus or amenities</div>
                    <form onSubmit={(e)=> e.preventDefault()} style={{display:'flex',justifyContent:'center',marginTop:16}}>
                        <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(248,250,252,0.9)',border:'1px solid rgba(226,232,240,0.7)',padding:'10px 12px',borderRadius:12,minWidth:280}}>
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Search hostels or amenities"
                                value={q}
                                onChange={(e)=> setQ(e.target.value)}
                                style={{border:'none',outline:'none',background:'transparent',width:320,maxWidth:'70vw'}}
                                aria-label="Search hostels"
                            />
                        </div>
                    </form>
                </div>
                {/* Render categories using filtered list if available */}
                <CategoryHostel externalHostels={filtered.length ? filtered : allHostels} />
            </div>
            <DetailPopup />
            <script src="https://js.paystack.co/v1/inline.js"></script>
            <Footer />
        </>
    );
}

export default Hostels;