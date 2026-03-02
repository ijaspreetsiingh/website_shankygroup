
const ContactHomeThree = () => {
  return (
    <>
      <section className="contact-section text-center">
        <div className="container">
          <div className="main-title">
            <h3>Contact<span className="text"><span className="gradient-color">Us</span></span></h3>
            <h2>Contact Us For &nbsp;<span>Consultation</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="contact-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-40.png)` }}></div>
                <div className="icon-box"><i className="icon-42"></i></div>
                <h5>Contact Us</h5>
                <h3><a href="mailto:location@website.com">location@website.com</a><br /><a href="tel:+60278945612">+(602) 789 456 12</a></h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="contact-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-40.png)` }}></div>
                <div className="icon-box"><i className="icon-43"></i></div>
                <h5>Location</h5>
                <h3>88 New South Head Rd <br />Triple, new York</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="contact-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-40.png)` }}></div>
                <div className="icon-box"><i className="icon-44"></i></div>
                <h5>Social Media</h5>
                <h3>Follow On Social media</h3>
                <ul className="social-links">
                  <li><a href="#"><i className="icon-15"></i></a></li>
                  <li><a href="#"><i className="icon-18"></i></a></li>
                  <li><a href="#"><i className="icon-16"></i></a></li>
                  <li><a href="#"><i className="icon-17"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHomeThree;