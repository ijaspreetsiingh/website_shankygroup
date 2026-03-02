import { Link } from "react-router-dom";



const PortfolioHomeTwo = () => {
  return (
    <>
      <section className="portfolio-section-three text-center">
        <div className="container">
          <div className="main-title">
            <h3>Brand Portfolio</h3>
            <h2>Here’s Our Latest <span className="gradient-color">Project</span></h2>
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum <br />quidem rerum facilis est et expedita distinctio possimus.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-8.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-9.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-10.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-11.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-12.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-13.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3><Link to="/portfolio-details">Application Development</Link></h3>
                </div>
              </div>
            </div>
          </div>
          <div className="extra-btn">
            <Link to="/portfolio" className="primary-btn one gradient-bg white-color border-btn">See All Portfolio</Link>
          </div>
        </div>
      </section>

    </>
  );
};

export default PortfolioHomeTwo;