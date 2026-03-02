 
import { Link } from "react-router-dom";


const ServiceHomeTwo = () => {
  return (
    <>
      <section className="service-section-three">
        <div className="container">
          <div className="main-title">
            <h3>Our Services</h3>
            <h2>Complete Brand Development, <br /><span className="gradient-color">From Strategy to Design</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/service-details">Branding</Link></h3>
                <p>The best practices built-in to their SignIn and UserProfile components would take months  of Enterprise extensibility or customisation to your brand.</p>
                <div className="icon-box"><img src="assets/images/icons/icon-12.png" alt="" /></div>
                <div className="link-box"><Link to="/service-details"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/service-details">UI UX Design</Link></h3>
                <p>The best practices built-in to their SignIn and UserProfile components would take months  of Enterprise extensibility or customisation to your brand.</p>
                <div className="icon-box"><img src="assets/images/icons/icon-13.png" alt="" /></div>
                <div className="link-box"><Link to="/service-details"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/service-details">Graphics Design</Link></h3>
                <p>The best practices built-in to their SignIn and UserProfile components would take months  of Enterprise extensibility or customisation to your brand.</p>
                <div className="icon-box"><img src="assets/images/icons/icon-14.png" alt="" /></div>
                <div className="link-box"><Link to="/service-details"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/service-details">Web Design</Link></h3>
                <p>The best practices built-in to their SignIn and UserProfile components would take months  of Enterprise extensibility or customisation to your brand.</p>
                <div className="icon-box"><img src="assets/images/icons/icon-15.png" alt="" /></div>
                <div className="link-box"><Link to="/service-details"><i className="icon-13"></i></Link></div>
              </div>
            </div>
          </div>
          <div className="extra-btn text-center">
            <Link to="/service" className="primary-btn one gradient-bg white-color border-btn">See All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHomeTwo;