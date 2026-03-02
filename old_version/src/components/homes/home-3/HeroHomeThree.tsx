 
import { Link } from "react-router-dom";
import { useState } from "react";
import VideoPopup from "../../../modals/video-popup";


const HeroHomeThree = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="hero-section-two text-center">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-28.png)` }}></div>
        <div className="container">
          <div className="content-box">
            <h3>Your Vision, <span className="gradient-color">Our Brand</span></h3>
            <h2>Crafting Brands That Speak <span>Your Language</span></h2>
            <p>We work closely with you to create a brand that feels authentic, resonates with your audience, and sets you <br />apart from the competition. Your vision is at the heart of everything we do.</p>
            <div className="btn-box">
              <Link to="/contact" className="primary-btn one gradient-bg white-color"><span>Contact Us</span><img src="assets/images/icons/icon-1.png" alt="" /></Link>
              <a href="#" className="primary-btn one gradient-bg white-color border-btn"><span>Lat’s Talk</span><img src="assets/images/icons/icon-2.png" alt="" /></a>
            </div>
            <div className="clients-box">
              <h3>Excellent <span className="gradient-color">40.00+</span> Reviews</h3>
              <ul className="clients-image">
                <li><img src="assets/images/resource/clients-1.png" alt="" /></li>
                <li><img src="assets/images/resource/clients-2.png" alt="" /></li>
                <li><img src="assets/images/resource/clients-3.png" alt="" /></li>
                <li><span className="gradient-bg">05K+</span></li>
              </ul>
            </div>
          </div>
          <div className="hero-image-box-two">
            <figure className="image"><img src="assets/images/hero/hero-1.jpg" alt="" /></figure>
            <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-29.png)` }}></div>
            <div className="curve-text">
              <div className="text"><img src="assets/images/icons/curve-text.png" alt="" /></div>
              <div className="video-btn">
                <a
                  onClick={() => setIsVideoOpen(true)}
                  style={{ cursor: "pointer" }}
                  className="lightbox-image" data-caption=""><i className="gradient-color icon-25"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Q5PG0rMXgvw"}
      />
      {/* video modal end */}


    </>
  );
};

export default HeroHomeThree;