

const IntroHomeFour = ({style_2} : any) => {
  return (
    <>
      <section className={`intro-section ${style_2 ? 'about-intro' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3><a href="#">Over 1336+ Success World wide Projects.</a></h3>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and pain.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3><a href="#">Over 756+ happy Clients <br />and Counting.</a></h3>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and pain.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3><a href="#">Over Presence in over <br />11+ Countries.</a></h3>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and pain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroHomeFour;