import { Link } from "react-router-dom";

 


const TeamHomeOne = () => {
  return (
    <>
      <section className="team-section-three text-center">
        <div className="outer-box">
          <div className="main-title-two">
            <span className="sub-title">(Our Team)</span>
            <h2>Special Team Member Our Digital <br />Agency Website</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-three">
                <figure className="image"><Link to="/team-details"><img src="assets/images/team/team-9.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <h3><Link to="/team-details">Marker Villa</Link></h3>
                  <span className="designation">CEO & Funder Axion</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-three">
                <figure className="image"><Link to="/team-details"><img src="assets/images/team/team-10.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <h3><Link to="/team-details">Haden Molk</Link></h3>
                  <span className="designation">UI/UX Designer junior</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-three">
                <figure className="image"><Link to="/team-details"><img src="assets/images/team/team-11.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <h3><Link to="/team-details">Draco Esmeray</Link></h3>
                  <span className="designation">Company Manager</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-three">
                <figure className="image"><Link to="/team-details"><img src="assets/images/team/team-12.jpg" alt="" /></Link></figure>
                <div className="text-box">
                  <h3><Link to="/team-details">Christin Harish</Link></h3>
                  <span className="designation">Java Developer Senior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamHomeOne;