import { Link } from "react-router-dom";


const BlogHomeTwo = () => {
  return (
    <>
      <section className="news-section-three">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-52.png)` }}></div>
        <div className="container">
          <div className="main-title">
            <h3>Blog & News</h3>
            <h2>Latest New & <span className="gradient-color">Blog</span></h2>
            <Link to="/blog" className="primary-btn one gradient-bg white-color">View More</Link>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-four">
                <div className="content-box">
                  <ul className="post-info">
                    <li><img src="assets/images/icons/icon-18.png" alt="" /><span>Feb 10-2024</span></li>
                    <li><img src="assets/images/icons/icon-19.png" alt="" /><span>FComment (9)</span></li>
                  </ul>
                  <h3><Link to="/blog-details">Purus Face Integer Praesen
                    Sollicitudin Netus Odio Comodo.</Link></h3>
                </div>
                <figure className="image-box"><Link to="/blog-details"><img src="assets/images/news/news-6.jpg" alt="" /></Link></figure>
                <div className="btn-box">
                  <Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn">Rad More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-four">
                <div className="content-box">
                  <ul className="post-info">
                    <li><img src="assets/images/icons/icon-18.png" alt="" /><span>Feb 10-2024</span></li>
                    <li><img src="assets/images/icons/icon-19.png" alt="" /><span>FComment (9)</span></li>
                  </ul>
                  <h3><Link to="/blog-details">Montes Tortor UIamcorper Lectus Habitassse Augue</Link></h3>
                </div>
                <figure className="image-box"><Link to="/blog-details"><img src="assets/images/news/news-7.jpg" alt="" /></Link></figure>
                <div className="btn-box">
                  <Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn">Rad More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="news-block-four">
                <div className="content-box">
                  <ul className="post-info">
                    <li><img src="assets/images/icons/icon-18.png" alt="" /><span>Feb 10-2024</span></li>
                    <li><img src="assets/images/icons/icon-19.png" alt="" /><span>FComment (9)</span></li>
                  </ul>
                  <h3><Link to="/blog-details">Suspendise Loorts Conubia Nullla Hymenaeos Pellentesque</Link></h3>
                </div>
                <figure className="image-box"><Link to="/blog-details"><img src="assets/images/news/news-8.jpg" alt="" /></Link></figure>
                <div className="btn-box">
                  <Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn">Rad More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogHomeTwo;