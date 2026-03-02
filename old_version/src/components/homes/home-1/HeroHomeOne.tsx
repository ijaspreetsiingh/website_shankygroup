import { Link } from "react-router-dom";

 

const HeroHomeOne = () => {
  return (
    <>
      <section className="hero-section-four">
        <div className="pattern-box" style={{ backgroundImage: `url(/assets/images/shape/shape-62.png)` }}></div>
        <div className="outer-box">
          <div className="upper-box">
            <div className="title-box">
              <h2><span>We are skilled in</span> Web <br />Design and Development</h2>
            </div>
            <div className="clients-box">
              <ul className="clients-list">
                <li><div className="customer-image"><img src="assets/images/resource/customer-1.png" alt="" /></div></li>
                <li><div className="customer-image"><img src="assets/images/resource/customer-2.png" alt="" /></div></li>
                <li><div className="customer-image"><img src="assets/images/resource/customer-3.png" alt="" /></div></li>
                <li><div className="customer-image"><img src="assets/images/resource/customer-4.png" alt="" /></div></li>
                <li><h5>Case <br />Study</h5></li>
              </ul>
            </div>
          </div>
          <div className="lower-box">
            <figure className="image"><img src="assets/images/resource/banner-1.png" alt="" /></figure>
            <div className="content-box">
              <div className="shape-box">
                <div className="shape-1" style={{ backgroundImage: `url(/assets/images/shape/shape-63.png)` }}></div>
                <div className="shape-2" style={{ backgroundImage: `url(/assets/images/shape/shape-64.png)` }}></div>
              </div>
              <p>Jass, a web design agency crafted by a dedicated team of Creative champions the essence of simplicity and elegance.</p>
              <div className="link-text"><Link to="/">Read More</Link></div>
              <ul className="scroll-text">
                <li>Web Design & Development</li>
                <li>Web Design & Development</li>
                <li>Web Design & Development</li>
                <li>Web Design & Development</li>
                <li>Web Design & Development</li>
              </ul>
              <div className="scroll-down"><a href="#footer">Scroll Down</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroHomeOne;