import { Link } from "react-router-dom";

 

const CtaHomeOne = () => {
  return (
    <>
      <section className="cta-section-two">
        <div className="pattern-box" style={{ backgroundImage: `url(/assets/images/shape/shape-68.png)` }}></div>
        <div className="outer-box">
          <div className="main-content-box">
            <h2>Let’s Go Build Your <br />Work.</h2>
            <div className="text-box">
              <p>Using year-over-year most design approaches <br />and latest techs website will be lightly.</p>
              <Link to="/">Get a Quote</Link>
            </div>
            <div className="inner-box">
              <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-69.png)` }}></div>
              <h5>Call Now</h5>
              <a href="tel:90074204200">+(9) 007 420 4200</a>
              <div className="icon-box"><img src="assets/images/icons/icon-38.png" alt="" /></div>
              <ul className="clients-list">
                <li><img src="assets/images/resource/clients-8.png" alt="" /></li>
                <li><img src="assets/images/resource/clients-9.png" alt="" /></li>
                <li><span><img src="assets/images/icons/icon-39.png" alt="" /></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaHomeOne;