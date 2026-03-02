import { Link } from "react-router-dom";

 


const WorkingHomeOne = () => {
  return (
    <>
      <section className="working-section-two">
        <div className="outer-box">
          <div className="main-title-two">
            <span className="sub-title">(Discover Work Process)</span>
            <h2>How We Works</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="working-block-two">
                <div className="shape-box" style={{ backgroundImage: `url(/assets/images/shape/shape-67.png)` }}></div>
                <h2>01</h2>
                <h3><Link to="/">Discovery & <br />Strategy</Link></h3>
                <p>Elevate your brand’s Presence With tailored <br />Solutions that resonate with you Brand</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="working-block-two">
                <div className="shape-box" style={{ backgroundImage: `url(/assets/images/shape/shape-67.png)` }}></div>
                <h2>02</h2>
                <h3><Link to="/">Design & <br />Development</Link></h3>
                <p>Elevate your brand’s Presence With tailored <br />Solutions that resonate with you Brand</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="working-block-two">
                <div className="shape-box" style={{ backgroundImage: `url(/assets/images/shape/shape-67.png)` }}></div>
                <h2>03</h2>
                <h3><Link to="/">Launch & <br />+
                  Monitoring</Link></h3>
                <p>Elevate your brand’s Presence With tailored <br />Solutions that resonate with you Brand</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="working-block-two">
                <div className="shape-box" style={{ backgroundImage: `url(/assets/images/shape/shape-67.png)` }}></div>
                <h2>04</h2>
                <h3><Link to="/">Discovery & <br />Strategy</Link></h3>
                <p>Elevate your brand’s Presence With tailored <br />Solutions that resonate with you Brand</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkingHomeOne;