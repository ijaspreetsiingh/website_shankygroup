import { Link } from "react-router-dom";


const TeamHomeTwo = () => {
  return (
    <>
      <section className="team-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-50.png)` }}></div>
        <div className="container">
          <div className="title-box d-flex flex-end space-between">
            <div className="main-title">
              <h3>Team Member</h3>
              <h2>We Provide Professional <br /><span className="gradient-color">Meet Talented Team</span></h2>
            </div>
            <div className="title-text">
              <p>Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio possimus.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="assets/images/team/team-1.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Alexander James</Link></h5>
                  <span className="designation">SEO Marketer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="assets/images/team/team-2.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Maximilian George</Link></h5>
                  <span className="designation">SEO Marketer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="assets/images/team/team-3.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Genevieve Alice</Link></h5>
                  <span className="designation">SEO Marketer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="assets/images/team/team-4.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Benjamin Arthur</Link></h5>
                  <span className="designation">SEO Marketer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamHomeTwo;