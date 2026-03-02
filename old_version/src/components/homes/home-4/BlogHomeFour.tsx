import { Link } from "react-router-dom";


const BlogHomeFour = () => {
  return (
    <>
      <section className="news-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-20.png)` }}></div>
        <div className="container">
          <div className="main-title text-center">
            <h3>Recent Articles</h3>
            <h2>Lates <span className="gradient-color">Blog Journal</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-one">
                <div className="image-box">
                  <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-1.jpg" alt="" /></Link></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-21.png)` }}></div>
                  <div className="post-date">
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
                  <h3><Link to="/blog-details">Purus Face Integer Praesen Sollicitudin Netus Odio Comodo.</Link></h3>
                  <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-one">
                <div className="image-box">
                  <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-2.jpg" alt="" /></Link></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-21.png)` }}></div>
                  <div className="post-date">
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
                  <h3><Link to="/blog-details">Montes Tortor Ulamcorper Lectus Habitasse Augue No Some</Link></h3>
                  <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-one">
                <div className="image-box">
                  <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-3.jpg" alt="" /></Link></figure>
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-21.png)` }}></div>
                  <div className="post-date">
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
                  <h3><Link to="/blog-details">Suspendise Loborts Conubia Nulla Hymenaeos Pellentesque</Link></h3>
                  <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                </div>
              </div>
            </div>
          </div>
          <div className="extra-button text-center">
            <Link to="/blog" className="primary-btn one gradient-bg white-color border-btn"><span>See All Blog</span><i className="icon-1 gradient-color"></i></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogHomeFour;