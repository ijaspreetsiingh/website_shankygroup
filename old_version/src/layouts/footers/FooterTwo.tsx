import { Link } from "react-router-dom";

 
 

const FooterTwo = () => {
  return (
    <>
      <footer className="main-footer style-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-53.png)` }}></div>
        <div className="container">
          <div className="widget-section">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12 footer-column">
                <div className="small-column">
                  <figure className="footer-logo"><a href="#"><span style={{fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(45deg, #ffffff, #f0f0f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Arial, sans-serif'}}>Jass</span></a></figure>
                  <p>But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated.</p>
                  <h6>Follow Us:</h6>
                  <ul className="social-links">
                    <li><a href="#"><i className="icon-15"></i></a></li>
                    <li><a href="#"><i className="icon-18"></i></a></li>
                    <li><a href="#"><i className="icon-16"></i></a></li>
                    <li><a href="#"><i className="icon-17"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 footer-column">
                <div className="big-column">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget links-widget">
                        <div className="widget-title">
                          <h3>Company</h3>
                        </div>
                        <div className="widget-content">
                          <ul className="links-list clearfix">
                            <li><Link to="#">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/service">Our Services</Link></li>
                            <li><Link to="/portfolio">Project & Portfolio</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget links-widget">
                        <div className="widget-title">
                          <h3>Our Services</h3>
                        </div>
                        <div className="widget-content">
                          <ul className="links-list clearfix">
                            <li><a href="#">Consulting</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Brand Strategy</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">Communication</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget subscribe-widget">
                        <div className="widget-title">
                          <h3>Subscribe.</h3>
                        </div>
                        <div className="widget-content">
                          <form onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                              <div className="icon-box"><i className="icon-55"></i></div>
                              <input type="email" name="email" placeholder="Your Email" required />
                              <button type="submit"><i className="icon-52"></i></button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright"><p>Copyright &copy; {new Date().getFullYear()} by <a href="#">Jass</a></p></div>
              <ul className="footer-nav">
                <li><a href="#">Teams Of Services</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Cooke Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterTwo;