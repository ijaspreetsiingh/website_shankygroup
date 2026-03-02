 
import { useState } from "react";
import VideoPopup from "../../../modals/video-popup";


const HeroHomeTwo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="hero-section-three">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-42.png)` }}></div>
        <div className="container">
          <div className="hero-upper-content-three">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12 col-sm-12 block-column">
                <div className="content-box">
                  <div className="title-box">
                    <h3>We Are</h3>
                    <div className="icon-box"><img src="assets/images/icons/icon-9.png" alt="" /><img src="assets/images/icons/icon-9.png" alt="" /></div>
                  </div>
                  <div className="inner-box">
                    <figure className="image"><img src="assets/images/resource/banner-1.jpg" alt="" /></figure>
                    <h3 className="gradient-color">Creative</h3>
                  </div>
                  <h2>Branding Agency</h2>
                  <div className="text-box">
                    <p>We work closely with you to create a brand that feels authentic, resonates with your audience, and sets you apart from the competition. Your vision is at the heart of everything we do.</p>
                    <a href="#" className="primary-btn one gradient-bg white-color border-btn">Explore More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 block-column">
                <div className="hero-image-box-three">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-44.png)` }}></div>
                  <figure className="image"><img src="assets/images/hero/hero-2.jpg" alt="" /></figure>
                  <div className="curve-text">
                    <div className="text"><img src="assets/images/icons/curve-text-3.png" alt="" /></div>
                    <div className="video-btn">
                      <a
                        onClick={() => setIsVideoOpen(true)}
                        style={{ cursor: "pointer" }}
                        className="lightbox-image" data-caption=""><i className="gradient-color icon-25"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-lower-content">
            <ul className="slide-text">
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Creative Branding Agency</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="" /><span>Branding Agency</span></li>
            </ul>
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

export default HeroHomeTwo;