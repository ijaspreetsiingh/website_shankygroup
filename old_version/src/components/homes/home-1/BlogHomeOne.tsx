import { Link } from "react-router-dom";

 


const BlogHomeOne = () => {
  return (
    <>
      <section className="news-section-four">
        <div className="outer-box">
          <div className="title-box">
            <div className="main-title-two">
              <span className="sub-title">(Our Blog)</span>
              <h2>Insight The Latest <br />Blog</h2>
            </div>
            <div className="text-box">
              <p>Lumara, a web design agency crafted by a dedicated <br />team of Creative champions the essence of simplicity <br />and elegance.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="news-block-six">
                <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-17.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <ul className="post-info">
                    <li>24, Jan - 2017</li>
                    <li>03 Comments</li>
                  </ul>
                  <h3><Link to="/blog-details">The Heart Of your Digital Agency Strategy</Link></h3>
                  <div className="link"><Link to="/blog-details">Read More</Link></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="news-block-six">
                <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-18.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <ul className="post-info">
                    <li>24, Jan - 2017</li>
                    <li>03 Comments</li>
                  </ul>
                  <h3><Link to="/blog-details">How Feux helps businesses stand out</Link></h3>
                  <div className="link"><Link to="/blog-details">Read More</Link></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="news-block-six">
                <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-19.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <ul className="post-info">
                    <li>24, Jan - 2017</li>
                    <li>03 Comments</li>
                  </ul>
                  <h3><Link to="/blog-details">The Art of Creative storytelling at</Link></h3>
                  <div className="link"><Link to="/blog-details">Read More</Link></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="news-block-six">
                <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-20.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <ul className="post-info">
                    <li>24, Jan - 2017</li>
                    <li>03 Comments</li>
                  </ul>
                  <h3><Link to="/blog-details">Our Most resent Updates & announcements</Link></h3>
                  <div className="link"><Link to="/blog-details">Read More</Link></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lower-link-box text-center"><Link to="/blog"> View All</Link></div>
        </div>
      </section>
    </>
  );
};

export default BlogHomeOne;