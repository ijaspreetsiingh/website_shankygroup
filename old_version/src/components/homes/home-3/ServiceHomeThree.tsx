import { Link } from "react-router-dom";


const ServiceHomeThree = () => {
  return (
    <>
      <section className="service-section-two">
        <div className="container">
          <div className="main-title text-center">
            <h3>Our <span className="text"><span className="gradient-color">Services</span></span></h3>
            <h2>Complete Brand Development From, <span>From Strategy to Design</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="service-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-31.png)` }}></div>
                <div className="icon-box"><i className="icon-27"></i></div>
                <h3><Link to="/service-details">UI UX Design</Link></h3>
                <p>There are many variations of passages of available, but the majority have suffered alteration in some for  by injected humour or randomised words which don't look even slightly believable.</p>
                <div className="link-box"><Link to="/service-details"><span className="gradient-color">View Details</span><i className="gradient-color icon-1"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="service-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-31.png)` }}></div>
                <div className="icon-box"><i className="icon-28"></i></div>
                <h3><Link to="/service-details">Branding Design</Link></h3>
                <p>There are many variations of passages of available, but the majority have suffered alteration in some for  by injected humour or randomised words which don't look even slightly believable.</p>
                <div className="link-box"><Link to="/service-details"><span className="gradient-color">View Details</span><i className="gradient-color icon-1"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="service-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-31.png)` }}></div>
                <div className="icon-box"><i className="icon-29"></i></div>
                <h3><Link to="/service-details">Web Development</Link></h3>
                <p>There are many variations of passages of available, but the majority have suffered alteration in some for  by injected humour or randomised words which don't look even slightly believable.</p>
                <div className="link-box"><Link to="/service-details"><span className="gradient-color">View Details</span><i className="gradient-color icon-1"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="service-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-31.png)` }}></div>
                <div className="icon-box"><i className="icon-30"></i></div>
                <h3><Link to="/service-details">Digital Marketing</Link></h3>
                <p>There are many variations of passages of available, but the majority have suffered alteration in some for  by injected humour or randomised words which don't look even slightly believable.</p>
                <div className="link-box"><Link to="/service-details"><span className="gradient-color">View Details</span><i className="gradient-color icon-1"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="service-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-31.png)` }}></div>
                <div className="icon-box"><i className="icon-31"></i></div>
                <h3><Link to="/service-details">Motion Design</Link></h3>
                <p>There are many variations of passages of available, but the majority have suffered alteration in some for  by injected humour or randomised words which don't look even slightly believable.</p>
                <div className="link-box"><Link to="/service-details"><span className="gradient-color">View Details</span><i className="gradient-color icon-1"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="more-service-box text-center">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-32.png)` }}></div>
                <div className="shape-2" style={{ backgroundImage: `url(/assets/images/shape/shape-33.png)` }}></div>
                <h3>Need More Business
                  Services?</h3>
                <div className="link"><Link to="/service"><span>Click Now</span><img src="assets/images/icons/icon-3.png" alt="" /></Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHomeThree;