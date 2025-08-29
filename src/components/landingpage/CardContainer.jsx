import "../../assets/css/landingpage/CardContainer.css";
import SearchForm from "./SearchForm";
import LandingTest from "./LandingText";
import InformationSection from "./InformationSection";

function CardContainer() {
  return (
    <div className="hero_section">
      <LandingTest />
      <div class="card-container">
        <SearchForm />
      </div>
      <InformationSection />
    </div>
  );
}

export default CardContainer;
