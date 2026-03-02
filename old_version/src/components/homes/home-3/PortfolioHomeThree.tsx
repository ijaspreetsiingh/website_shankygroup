import { Link } from "react-router-dom";

const PortfolioHomeThree = () => {
  return (
    <>
      <section className="portfolio-section-two">
        <div className="container">
          <div className="main-title">
            <h3>Recent <span className="text"><span className="gradient-color">Project</span></span></h3>
            <h2>Innovative Projects That <br /><span>Define Excellence</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-two">
                <div className="portfolio-image-two">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-5.jpg" alt="" /></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-37.png)` }}></div>
                  <div className="link"><Link to="/portfolio-details"><img src="assets/images/icons/icon-3.png" alt="" /></Link></div>
                </div>
                <div className="portfolio-content-two">
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                  <span className="text">Web Design</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-two">
                <div className="portfolio-image-two">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-6.jpg" alt="" /></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-37.png)` }}></div>
                  <div className="link"><Link to="/portfolio-details"><img src="assets/images/icons/icon-3.png" alt="" /></Link></div>
                </div>
                <div className="portfolio-content-two">
                  <h3><Link to="/portfolio-details">Search Engine Optimization</Link></h3>
                  <span className="text">Web Design</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-two">
                <div className="portfolio-image-two">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-7.jpg" alt="" /></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-37.png)` }}></div>
                  <div className="link"><Link to="/portfolio-details"><img src="assets/images/icons/icon-3.png" alt="" /></Link></div>
                </div>
                <div className="portfolio-content-two">
                  <h3><Link to="/portfolio-details">Website Development</Link></h3>
                  <span className="text">Web Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioHomeThree;