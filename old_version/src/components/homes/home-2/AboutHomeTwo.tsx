 
import { useState } from "react";
import VideoPopup from "../../../modals/video-popup";

const AboutHomeTwo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="about-section-three">
        <div className="container">
          <div className="main-content-box">
            <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-45.png)` }}></div>
            <div className="curve-text">
              <div className="text"><img src="assets/images/icons/curve-text-3.png" alt="" /></div>
              <div className="video-btn">
                <a
                  onClick={() => setIsVideoOpen(true)}
                  style={{ cursor: "pointer" }}
                  className="lightbox-image" data-caption=""><i className="gradient-color icon-25"></i></a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 block-column">
                <div className="about-image-three">
                  <figure className="image"><img src="assets/images/resource/about-5.jpg" alt="" /></figure>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 block-column">
                <div className="about-content-three">
                  <div className="main-title">
                    <h3>About Us</h3>
                    <h2>Empowering Brands <br /><span className="gradient-color">Through Exceptional Design</span></h2>
                  </div>
                  <div className="inner-box">
                    <p>There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    <div className="list-box">
                      <ul className="text-list clearfix">
                        <li><i className="icon-13"></i>We Design. You Grow.</li>
                        <li><i className="icon-13"></i>Innovative Designs,</li>
                      </ul>
                      <ul className="text-list clearfix">
                        <li><i className="icon-13"></i>Your Vision, Our Design Expertise</li>
                        <li><i className="icon-13"></i>Where Creativity Shapes Brands</li>
                      </ul>
                    </div>
                    <div className="btn-box"><a href="#" className="primary-btn one gradient-bg white-color border-btn">Learn More</a></div>
                  </div>
                </div>
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

export default AboutHomeTwo;