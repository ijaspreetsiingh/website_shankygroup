"use client"
import { Link } from "react-router-dom";


const BlogDetailsArea = () => {
  return (
    <>
      <section className="sidebar-page-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-five">
                  <div className="news-content-five">
                    <ul className="post-info">
                      <li><img src="assets/images/icons/icon-22.png" alt="" /><Link to="/blog-details">Mededi.Ha</Link></li>
                      <li><img src="assets/images/icons/icon-23.png" alt="" /><span>Comments (03)</span></li>
                      <li><img src="assets/images/icons/icon-24.png" alt="" /><span>3 min Read</span></li>
                    </ul>
                    <h2>Purus Face Integer Praesen Sollicitudin Netus Odio Comodo.</h2>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/news/news-12.jpg" alt="" /></figure>
                  </div>
                </div>
                <div className="text-box">
                  <p>There are many variations of passages of but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.</p>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                  <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                </div>
                <blockquote>
                  <div className="icon-box"><img src="assets/images/icons/icon-27.png" alt="" /></div>
                  <h3>In egret Farer  odio. Nunc at ipsum vitae neque eleifend suscipit A Id ante Ut nils Iacus viverra sed dapibus non tellus.</h3>
                </blockquote>
                <div className="text-box">
                  <h2>Let Our Investment management team</h2>
                  <ul className="list-item">
                    <li><i className="icon-57"></i><span>Full business control</span></li>
                    <li><i className="icon-57"></i><span>User dashboard & analytics</span></li>
                    <li><i className="icon-57"></i><span>Custom reporting</span></li>
                    <li><i className="icon-57"></i><span>Regular update monitoring</span></li>
                    <li><i className="icon-57"></i><span>24/7 priority support</span></li>
                  </ul>
                </div>
                <div className="two-column-image">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                      <figure className="image"><img src="assets/images/news/news-1.jpg" alt="" /></figure>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                      <figure className="image"><img src="assets/images/news/news-2.jpg" alt="" /></figure>
                    </div>
                  </div>
                </div>
                <div className="text-box">
                  <h2>What Are The Pros And Cons?</h2>
                  <p>Many will uncover many web sites still in their infancy. Various versions have evolved over the years sometimes by accident sometimes on purpose injected humour and the like.</p>
                  <p>Many will uncover many web sites still in their infancy. Various versions have evolved over the years sometimes by accident sometimes on purpose injected humour and the like.There are many variations of passages of available but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                </div>
                <div className="post-share-option">
                  <div className="text-box"><h2>Tags:</h2></div>
                  <div className="inner-box">
                    <ul className="post-tags">
                      <li><Link to="/blog-details">Agency</Link></li>
                      <li><Link to="/blog-details">Brand Genius</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                      <li><Link to="/blog-details">Creative</Link></li>
                    </ul>
                    <ul className="social-links">
                      <li><Link to="/blog-details"><i className="icon-15"></i></Link></li>
                      <li><Link to="/blog-details"><i className="icon-17"></i></Link></li>
                      <li><Link to="/blog-details"><i className="icon-16"></i></Link></li>
                      <li><Link to="/blog-details"><i className="icon-18"></i></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="comment-box">
                  <div className="text-box">
                    <h2>Comments</h2>
                  </div>
                  <div className="comment-inner">
                    <div className="comment">
                      <figure className="comment-thumb"><img src="assets/images/news/comment-1.png" alt="" /></figure>
                      <div className="comment-text">
                        <h3>Charlotte Sophia</h3>
                        <span className="designation">Product Manager</span>
                        <p>Many will uncover many web sites still in their infancy. Various versions have evolved over the years sometimes by accident sometimes on purpose injected humour and the like.</p>
                        <Link to="/blog-details">Reply</Link>
                      </div>
                    </div>
                    <div className="comment replay-comment">
                      <figure className="comment-thumb"><img src="assets/images/news/comment-2.png" alt="" /></figure>
                      <div className="comment-text">
                        <h3>Charlotte Sophia</h3>
                        <span className="designation">Product Manager</span>
                        <p>Various versions have evolved over the years sometimes by accident sometimes on purpose injected humour and the like.</p>
                        <Link to="/blog-details">Reply</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comment-form-area">
                  <div className="text-box">
                    <h2>Leave a Reply</h2>
                    <p>Your Email Address Will Not Be Published. Required Fields are marked</p>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Name*</label>
                          <input type="text" name="name" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Email*</label>
                          <input type="email" name="name" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label>Comment*</label>
                          <textarea name="message"></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label>Website*</label>
                          <input type="text" name="website" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="message-btn">
                          <button type="submit" className="primary-btn one gradient-bg white-color">Submit Now</button>
                        </div>
                      </div>
                    </div>
                  </form>
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
                    <form onSubmit={e => e.preventDefault()}>
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

export default BlogDetailsArea;