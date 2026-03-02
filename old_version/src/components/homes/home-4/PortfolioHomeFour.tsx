import { Link } from "react-router-dom";

const PortfolioHomeFour = () => {
  return (
    <>
      <section className="portfolio-section">
        <div className="container">
          <div className="title-box">
            <div className="main-title">
              <h3>Brand Portfolio</h3>
              <h2>Here’s Our Latest <br /><span className="gradient-color">Project</span></h2>
            </div>
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio possimus.</p>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 block-column">
              <div className="portfolio-block-one">
                <div className="text-box">
                  <h3><Link to="/portfolio-details">D-Form Business Strategy</Link></h3>
                  <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                </div>
                <div className="image-box">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-1.jpg" alt="" /></figure>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 block-column">
              <div className="portfolio-block-one">
                <div className="text-box">
                  <h3><Link to="/portfolio-details">Mark Wide Marketing Strategy</Link></h3>
                  <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                </div>
                <div className="image-box">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-2.jpg" alt="" /></figure>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 block-column">
              <div className="portfolio-block-one">
                <div className="text-box">
                  <h3><Link to="/portfolio-details">Decorator Hard Carpet.</Link></h3>
                  <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                </div>
                <div className="image-box">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-3.jpg" alt="" /></figure>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 block-column">
              <div className="portfolio-block-one">
                <div className="text-box">
                  <h3><Link to="/portfolio-details">White-line Face Beauty</Link></h3>
                  <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                </div>
                <div className="image-box">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-4.jpg" alt="" /></figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioHomeFour;