import { Link } from "react-router-dom";


const CtaHomeFour = () => {
  return (
    <>
      <section className="cta-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-24.png)` }}></div>
        <div className="container">
          <div className="cta-content">
            <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-22.png)` }}></div>
            <figure className="image"><img src="assets/images/icons/loud-1.png" alt="" /></figure>
            <h3>Hire Now Branding Agency</h3>
            <h2>Let’s Get In Touch.</h2>
            <p>Your Laboratory Instruments Should Serve you. Not the other way <br />around. We’re happy to help you.</p>
            <div className="btn-box">
              <Link to="/contact" className="primary-btn one gradient-bg white-color"><span>Let’s Talk</span><i className="icon-1 gradient-color"></i></Link>
              <Link to="/contact" className="primary-btn one gradient-bg white-color border-btn"><span>Book Now</span><i className="icon-1 gradient-color"></i></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaHomeFour;