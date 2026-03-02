import { Link } from "react-router-dom";



const PortfolioDetailsArea = () => {
  return (
    <>
      <section className="portfolio-details">
        <div className="container">
          <div className="top-box">
            <div className="inner-box">
              <figure className="top-image"><img src="assets/images/portfolio/portfolio-19.jpg" alt="" /></figure>
              <div className="lower-info">
                <div className="info-box">
                  <div className="single-item">
                    <div className="icon-box"><img src="assets/images/icons/icon-21.png" alt="" /></div>
                    <div className="inner">
                      <h5>Client Name</h5>
                      <span>Leslie Alexander</span>
                    </div>
                  </div>
                  <div className="single-item">
                    <div className="icon-box"><img src="assets/images/icons/icon-21.png" alt="" /></div>
                    <div className="inner">
                      <h5>Catagories</h5>
                      <span>Business, Development</span>
                    </div>
                  </div>
                  <div className="single-item">
                    <div className="icon-box"><img src="assets/images/icons/icon-21.png" alt="" /></div>
                    <div className="inner">
                      <h5>Project Name</h5>
                      <span>Design, Developmnent</span>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <Link to="/portfolio-details" className="primary-btn one gradient-bg white-color"><span>Need This Project?</span><i className="icon-1 gradient-color"></i></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-box">
            <h2>Social media Strategy & Planning</h2>
            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth the master builder of human happiness. No one rejects dislikes or avoids pleasure itself because it is pleasure but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
            <p>No one rejects dislikes or avoids pleasure itself because it is pleasure but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
            <h3>This event will allow participants to:</h3>
            <ul className="list">
              <li><i className="icon-57"></i><span>Business’s managers, Leaders</span></li>
              <li><i className="icon-57"></i><span>Downloadable lectures, code & design assets for all projects</span></li>
              <li><i className="icon-57"></i><span>Any one who is finding a chance to get the promotion</span></li>
              <li><i className="icon-57"></i><span>Any one who is finding a chance to get the promotion</span></li>
            </ul>
            <h3>Content & Creation</h3>
            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth the master builder of human happiness. No one rejects dislikes or avoids pleasure itself because it is pleasure but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
            <h3>Project Requirement</h3>
            <ul className="list">
              <li><i className="icon-57"></i><span>Full business control</span></li>
              <li><i className="icon-57"></i><span>User dashboard & analytics</span></li>
              <li><i className="icon-57"></i><span>Custom reporting</span></li>
              <li><i className="icon-57"></i><span>Regular update monitoring</span></li>
              <li><i className="icon-57"></i><span>24/7 priority support</span></li>
            </ul>
          </div>
          <div className="image-box">
            <div className="row clearfix">
              <div className="col-lg-4 col-md-6 col-sm-12 image-column">
                <figure className="image"><img src="assets/images/portfolio/portfolio-20.jpg" alt="" /></figure>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 image-column">
                <figure className="image"><img src="assets/images/portfolio/portfolio-21.jpg" alt="" /></figure>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 image-column">
                <figure className="image"><img src="assets/images/portfolio/portfolio-22.jpg" alt="" /></figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioDetailsArea;