

const TeamDetailsArea = () => {
  return (
    <>
      <section className="team-details">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-md-12 image-column">
              <div className="team-details-image">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-59.png)` }}></div>
                <figure className="image"><img src="assets/images/resource/team-details.jpg" alt="" /></figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="team-details-content">
                <h2>Andrew Schemer</h2>
                <span className="designation">Nursing Assistant</span>
                <p>There are many variations of passages of but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                <ul className="info-list">
                  <li><i className="icon-19"></i><span>6596 Elgin St. celina de, <br />1029</span></li>
                  <li><i className="icon-20"></i><a href="mailto:hi@andrewschemer.com">hi@andrewschemer.com</a></li>
                  <li><i className="icon-21"></i><a href="tel:2355550108">235 555-0108</a></li>
                </ul>
                <div className="inner-box">
                  <div className="single-item">
                    <div className="count-outer count-box">
                      <span className="odometer" data-count="13">00</span>
                    </div>
                    <h5>Years Of <br />Experience</h5>
                  </div>
                  <div className="single-item">
                    <div className="count-outer count-box">
                      <span className="odometer" data-count="99">00</span><span>+</span>
                    </div>
                    <h5>Clients <br />Worldwide</h5>
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

export default TeamDetailsArea;