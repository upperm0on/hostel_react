import '../../assets/css/landingpage/CarouselCard.css';

function CarouselCard() {
  return (
    <div className="carousel_card">
      <div className="carousel_title">
        <p className="title">Search Experience</p>
      </div>
      <p className="subtitle">
        Seamless Hostel Booking Experience from Home
      </p>
      <div className="flexed_content">
        
        <div className="before">
          <div className="before_details">
            <div className="before_icon">
              <img src="/icons/close_button.svg" alt="A Before Icon must be here" />
            </div>
          </div>
          <div className="before_image_container">
            <img src="/images/chatgpt_2.png" alt="The Before Image must be here" />
          </div>
        </div>
        
        <div className="before">
          <div className="before_details">
            <div className="before_icon">
              <img src="/icons/approved.svg" alt="A before Icon must be here" />
            </div>
          </div>
          <div className="before_image_container">
            <img src="/images/chat3.png" alt="The before Image must be here" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
