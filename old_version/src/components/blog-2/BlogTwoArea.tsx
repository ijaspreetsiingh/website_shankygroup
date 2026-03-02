"use client";

import { Link } from "react-router-dom";

const BlogTwoArea = () => {
  return (
    <>
      <section className="sidebar-page-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-standard-content">
                <div className="news-block-five">
                  <div className="image-box">
                    <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-12.jpg" alt="" /></Link></figure>
                    <div className="post-date">
                      <h3>26</h3>
                      <span>Jan</span>
                    </div>
                  </div>
                  <div className="news-content-five">
                    <ul className="post-info">
                      <li><img src="assets/images/icons/icon-22.png" alt="" /><Link to="/blog-details">Mededi.Ha</Link></li>
                      <li><img src="assets/images/icons/icon-23.png" alt="" /><span>Comments (03)</span></li>
                      <li><img src="assets/images/icons/icon-24.png" alt="" /><span>3 min Read</span></li>
                    </ul>
                    <h2><Link to="/blog-details">Purus Face Integer Praesen Sollicitudin Netus Odio Comodo.</Link></h2>
                    <p>There are many variations of passages of but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.</p>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                  </div>
                </div>
                <div className="news-block-five">
                  <div className="image-box">
                    <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-13.jpg" alt="" /></Link></figure>
                    <div className="post-date">
                      <h3>26</h3>
                      <span>Jan</span>
                    </div>
                  </div>
                  <div className="news-content-five">
                    <ul className="post-info">
                      <li><img src="assets/images/icons/icon-22.png" alt="" /><Link to="/blog-details">Mededi.Ha</Link></li>
                      <li><img src="assets/images/icons/icon-23.png" alt="" /><span>Comments (03)</span></li>
                      <li><img src="assets/images/icons/icon-24.png" alt="" /><span>3 min Read</span></li>
                    </ul>
                    <h2><Link to="/blog-details">The best products that shape fashion</Link></h2>
                    <p>There are many variations of passages of but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.</p>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                  </div>
                </div>
                <div className="news-block-five">
                  <div className="image-box">
                    <figure className="image"><Link to="/blog-details"><img src="assets/images/news/news-14.jpg" alt="" /></Link></figure>
                    <div className="post-date">
                      <h3>26</h3>
                      <span>Jan</span>
                    </div>
                  </div>
                  <div className="news-content-five">
                    <ul className="post-info">
                      <li><img src="assets/images/icons/icon-22.png" alt="" /><Link to="/blog-details">Mededi.Ha</Link></li>
                      <li><img src="assets/images/icons/icon-23.png" alt="" /><span>Comments (03)</span></li>
                      <li><img src="assets/images/icons/icon-24.png" alt="" /><span>3 min Read</span></li>
                    </ul>
                    <h2><Link to="/blog-details">Bed-get issues force the our to become</Link></h2>
                    <p>There are many variations of passages of but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.</p>
                    <div className="btn-box"><Link to="/blog-details" className="primary-btn one gradient-bg white-color border-btn"><span>Read More</span><i className="icon-1 gradient-color"></i></Link></div>
                  </div>
                </div>
                <div className="pagination-wrapper">
                  <ul className="pagination">
                    <li><a href="#">01</a></li>
                    <li><a href="#">02</a></li>
                    <li><a href="#"><i className="icon-1"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar">
                <div className="sidebar-widget search-widget">
                  <div className="widget-title">
                    <h3>Search Here</h3>
                  </div>
                  <div className="search-inner">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="form-group">
                        <input type="search" name="search-field" placeholder="Search Here" required />
                        <button type="submit"><img src="assets/images/icons/icon-25.png" alt="" /></button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="sidebar-widget post-widget">
                  <div className="widget-title">
                    <h3>Search Here</h3>
                  </div>
                  <div className="post-box">
                    <article className="post">
                      <figure className="post-image"><Link to="/blog-details"><img src="assets/images/news/post-1.jpg" alt="" /></Link></figure>
                      <div className="post-content">
                        <div className="post-date"><img src="assets/images/icons/icon-26.png" alt="" /><span>Jan 23, 2022</span></div>
                        <h5><Link to="/blog-details">Dui Venenatis Elit Morbile Morem Porttitor</Link></h5>
                      </div>
                    </article>
                    <article className="post">
                      <figure className="post-image"><Link to="/blog-details"><img src="assets/images/news/post-2.jpg" alt="" /></Link></figure>
                      <div className="post-content">
                        <div className="post-date"><img src="assets/images/icons/icon-26.png" alt="" /><span>Jan 23, 2022</span></div>
                        <h5><Link to="/blog-details">Cras Lacus Class a Carius Eleifend Hendrer</Link></h5>
                      </div>
                    </article>
                    <article className="post">
                      <figure className="post-image"><Link to="/blog-details"><img src="assets/images/news/post-3.jpg" alt="" /></Link></figure>
                      <div className="post-content">
                        <div className="post-date"><img src="assets/images/icons/icon-26.png" alt="" /><span>Jan 23, 2022</span></div>
                        <h5><Link to="/blog-details">Netus Fermentum Partur Putate Nise Tellus</Link></h5>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="sidebar-widget catagories-widget">
                  <div className="widget-title">
                    <h3>Catagories</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="catagories-list clearfix">
                      <li><Link to="/blog-details"><span className="text">Mobile Set</span><span className="number">01</span></Link></li>
                      <li><Link to="/blog-details"><span className="text">Design Fusion</span><span className="number">02</span></Link></li>
                      <li><Link to="/blog-details"><span className="text">Brand Elevate</span><span className="number">03</span></Link></li>
                      <li><Link to="/blog-details"><span className="text">Studio Inscribe</span><span className="number">04</span></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="sidebar-widget tags-widget">
                  <div className="widget-title">
                    <h3>Populer Tags</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="tags-list clearfix">
                      <li><Link to="/blog-details">Brand Genius</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Agency</Link></li>
                      <li><Link to="/blog-details">Branding</Link></li>
                      <li><Link to="/blog-details">Marketing</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Creative Bloom</Link></li>
                    </ul>
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

export default BlogTwoArea;