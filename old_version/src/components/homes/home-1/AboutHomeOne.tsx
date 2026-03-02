import { Link } from "react-router-dom";

 

const AboutHomeOne = () => {
  return (
    <>
      <section className="about-section-five">
        <div className="outer-box">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="left-content">
                <div className="main-title-two">
                  <span className="sub-title">(Who We Are)</span>
                </div>
                <div className="content-box">
                  <div className="single-box">
                    <div className="icon-box"><img src="assets/images/icons/icon-29.png" alt="" /></div>
                    <div className="text-box">
                      <h3>Efficiency & Management</h3>
                      <p>Pellentesque pellentesque commodo tellus, in. Mauris dignissim viverra nisl non tempus. Fusce rhoncus, mauris quis pretium auctor.</p>
                    </div>
                  </div>
                  <div className="single-box">
                    <div className="icon-box"><img src="assets/images/icons/icon-30.png" alt="" /></div>
                    <div className="text-box">
                      <h3>Commitment & Professional</h3>
                      <p>Inside tomopi condimentum dictum odio, sed faucibus enim ornare a. Nunc feugiat extem usto, vestibulum imperdiet ligula mollis vel.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="right-content">
                <h2>Have a Brilliant Idea Boost the Growth <img src="assets/images/icons/icon-31.png" alt="" /> Development Agency <img src="assets/images/icons/icon-32.png" alt="" /> Your Branding! <img src="assets/images/icons/icon-33.png" alt="" /></h2>
                <p>Jass, Consumers today rely heavily on digital means to research products. We research a brand of blend engaging with it, according to the meanwhile, 60% of consumers.</p>
                <Link to="/about">About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHomeOne;