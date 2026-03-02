"use client";

const ContactHomeTwo = () => {
  return (
    <>
      <section className="contact-section-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="contact-content-two">
                <div className="main-title">
                  <h3>Contact Us</h3>
                  <h2>Let’s start the <br /><span className="gradient-color">Productive Work.</span></h2>
                </div>
                <div className="inner-box">
                  <div className="single-item">
                    <div className="icon-box"><i className="icon-55"></i></div>
                    <h3>Say Hello</h3>
                    <p><a href="mailto:support@gmail.com">support@gmail.com</a><br /><a href="tel:123456789">+123 456 789</a></p>
                  </div>
                  <div className="single-item">
                    <div className="icon-box"><i className="icon-56"></i></div>
                    <h3>Location</h3>
                    <p>123 king Street, London W8 9JG <br />United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="contact-form-box">
                <form onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Name*</label>
                        <input type="text" name="name" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Email*</label>
                        <input type="email" name="email" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label>Message*</label>
                        <textarea name="Message" placeholder="Enter your message"></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <button type="submit" className="primary-btn one gradient-bg white-color">Send Now</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHomeTwo;