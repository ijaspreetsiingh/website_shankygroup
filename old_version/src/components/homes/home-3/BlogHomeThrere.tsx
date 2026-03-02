import { Link } from "react-router-dom";


const BlogHomeThrere = () => {
  return (
    <>
      <section className="news-section-two">
        <div className="container">
          <div className="title-box">
            <div className="main-title">
              <h3><span className="text"><span className="gradient-color">Our News</span></span></h3>
              <h2>Latest News & <span>Blog</span></h2>
            </div>
            <div className="btn-box"><Link to="/blog" className="primary-btn one gradient-bg white-color border-btn"><span>See All Blog</span><img src="assets/images/icons/icon-2.png" alt="" /></Link></div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 block-column">
              <div className="news-block-two">
                <div className="inner-box">
                  <div className="bg-image" style={{ backgroundImage: `url(/assets/images/news/news-4.jpg)` }}></div>
                  <div className="news-post-date">
                    <h3>26</h3>
                    <span>Jan</span>
                  </div>
                  <div className="news-content">
                    <ul className="category">
                      <li><Link to="/blog-details">Marketing</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Agency</Link></li>
                      <li><Link to="/blog-details">Branding</Link></li>
                    </ul>
                    <h3><Link to="/blog-details">Purus Face Integer Praesen Sollicitudin Netus Odio Comodo.</Link></h3>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><img src="assets/images/icons/icon-8.png" alt="" /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 block-column">
              <div className="news-block-three">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/news/news-5.jpg" alt="" /></figure>
                    <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-39.png)` }}></div>
                    <div className="news-post-date">
                      <h3>26</h3>
                      <span>Jan</span>
                    </div>
                  </div>
                  <div className="news-content">
                    <ul className="category">
                      <li><Link to="/blog-details">Marketing</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Agency</Link></li>
                      <li><Link to="/blog-details">Branding</Link></li>
                    </ul>
                    <h3><Link to="/blog-details">What's The Holding Back The It Solution</Link></h3>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><img src="assets/images/icons/icon-8.png" alt="" /></Link></div>
                  </div>
                </div>
              </div>
              <div className="news-block-three">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/news/news-5.jpg" alt="" /></figure>
                    <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-39.png)` }}></div>
                    <div className="news-post-date">
                      <h3>26</h3>
                      <span>Jan</span>
                    </div>
                  </div>
                  <div className="news-content">
                    <ul className="category">
                      <li><Link to="/blog-details">Marketing</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Agency</Link></li>
                      <li><Link to="/blog-details">Branding</Link></li>
                    </ul>
                    <h3><Link to="/blog-details">Keep Your Business Safe & Ensure High Availability.</Link></h3>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><img src="assets/images/icons/icon-8.png" alt="" /></Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogHomeThrere;