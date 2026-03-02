import { Link } from "react-router-dom";

 


const PortfolioHomeOne = () => {
  return (
    <>
      <section className="portfolio-section-four">
        <div className="pattern-box" style={{ backgroundImage: `url(/assets/images/shape/shape-66.png)` }}></div>
        <div className="outer-box">
          <div className="title-box text-center">
            <h2>Crafting Digital Experiences <br />That Drive Results</h2>
            <p>Lumara, Consumers today rely heavily research products. 60% of consumers.</p>
          </div>
          <div className="main-content-box">
            <div className="portfolio-block-four">
              <div className="text-box">
                <h3><Link to="/portfolio-details">Website Design & Development</Link></h3>
                <ul className="category-list">
                  <li><Link to="/portfolio-details">Web Development</Link></li>
                  <li><Link to="/portfolio-details">Online Promotion</Link></li>
                </ul>
              </div>
              <div className="link-box">
                <Link to="/portfolio-details"><img src="assets/images/icons/icon-34.png" alt="" /></Link>
              </div>
              <div className="image-content">
                <figure className="image"><img src="assets/images/portfolio/portfolio-1.png" alt="" /></figure>
              </div>
            </div>
            <div className="portfolio-block-four">
              <div className="text-box">
                <h3><Link to="/portfolio-details">Product Branding</Link></h3>
                <ul className="category-list">
                  <li><Link to="/portfolio-details">Promotion</Link></li>
                  <li><Link to="/portfolio-details">Advertising</Link></li>
                  <li><Link to="/portfolio-details">Logo Desing</Link></li>
                </ul>
              </div>
              <div className="link-box">
                <Link to="/portfolio-details"><img src="assets/images/icons/icon-34.png" alt="" /></Link>
              </div>
              <div className="image-content">
                <figure className="image"><img src="assets/images/portfolio/portfolio-1.png" alt="" /></figure>
              </div>
            </div>
            <div className="portfolio-block-four">
              <div className="text-box">
                <h3><Link to="/portfolio-details">Application Desing & Development</Link></h3>
                <ul className="category-list">
                  <li><Link to="/portfolio-details">Promotion</Link></li>
                  <li><Link to="/portfolio-details">Advertising</Link></li>
                  <li><Link to="/portfolio-details">Logo Desing</Link></li>
                </ul>
              </div>
              <div className="link-box">
                <Link to="/portfolio-details"><img src="assets/images/icons/icon-34.png" alt="" /></Link>
              </div>
              <div className="image-content">
                <figure className="image"><img src="assets/images/portfolio/portfolio-1.png" alt="" /></figure>
              </div>
            </div>
            <div className="portfolio-block-four">
              <div className="text-box">
                <h3><Link to="/portfolio-details">Event Management</Link></h3>
                <ul className="category-list">
                  <li><Link to="/portfolio-details">Logo Desing</Link></li>
                  <li><Link to="/portfolio-details">Brand Promotion</Link></li>
                </ul>
              </div>
              <div className="link-box">
                <Link to="/portfolio-details"><img src="assets/images/icons/icon-34.png" alt="" /></Link>
              </div>
              <div className="image-content">
                <figure className="image"><img src="assets/images/portfolio/portfolio-1.png" alt="" /></figure>
              </div>
            </div>
          </div>
          <div className="lower-link-box text-center"><Link to="/portfolio">Explore Services</Link></div>
        </div>
      </section>
    </>
  );
};

export default PortfolioHomeOne;