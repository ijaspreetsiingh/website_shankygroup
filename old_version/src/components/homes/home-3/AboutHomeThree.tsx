import { Link } from "react-router-dom";


const AboutHomeThree = () => {
  return (
    <>
      <section className="about-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-30.png)` }}></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 content-block">
              <div className="about-content-two">
                <div className="main-title">
                  <h3>Company <span className="text"><span className="gradient-color">About Us</span></span></h3>
                  <h2>Empowering Brands Through <span>Exceptional Design</span></h2>
                </div>
                <div className="text-box">
                  <p>There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
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
                <div className="btn-box">
                  <Link to="/about" className="primary-btn one gradient-bg white-color border-btn"><span>More About Us</span><img src="assets/images/icons/icon-2.png" alt="" /></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 image-block">
              <div className="about-image-two">
                <figure className="image"><img src="assets/images/resource/about-4.jpg" alt="" /></figure>
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-34.png)` }}></div>
                <div className="experience-box">
                  <div className="text"><img src="assets/images/icons/curve-text-2.png" alt="" /></div>
                  <h2><span className="gradient-color">15+</span></h2>
                </div>
                <div className="rating-box">
                  <div className="icon-box"><i className="icon-26"></i></div>
                  <div className="text">
                    <h5>5 Stars</h5>
                    <p>Read Our Success Stories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHomeThree;