import { Link } from "react-router-dom";


const AboutArea = () => {
  return (
    <>
      <section className="about-section-four">
        <div className="about-image-four">
          <figure className="image"><img src="assets/images/resource/about-1.png" alt="" /></figure>
          <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-56.png)` }}></div>
          <div className="rotate-text-box">
            <div className="shape-1" style={{ backgroundImage: `url(/assets/images/shape/shape-4.png)` }}></div>
            <div className="shape-2" style={{ backgroundImage: `url(/assets/images/shape/shape-5.png)` }}></div>
            <h2>15</h2>
            <span className="curved-text"
              style={{
                position: 'absolute',
                visibility: 'visible',
                height: '60.4583px'
              }}
            >
              <span className="char1" style={{ position: 'absolute', left: '50%', marginLeft: '-0.357143em', transform: 'rotate(-73.3386deg)', transformOrigin: 'center 5em' }}>Y</span>
              <span className="char2" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(-63.5983deg)', transformOrigin: 'center 5em' }}>e</span>
              <span className="char3" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(-54.431deg)', transformOrigin: 'center 5em' }}>a</span>
              <span className="char4" style={{ position: 'absolute', left: '50%', marginLeft: '-0.178571em', transform: 'rotate(-46.9825deg)', transformOrigin: 'center 5em' }}>r</span>
              <span className="char5" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(-39.5341deg)', transformOrigin: 'center 5em' }}>s</span>
              <span className="char6" style={{ position: 'absolute', left: '50%', marginLeft: '-0.142857em', transform: 'rotate(-32.6586deg)', transformOrigin: 'center 5em' }}>&nbsp;</span>
              <span className="char7" style={{ position: 'absolute', left: '50%', marginLeft: '-0.392857em', transform: 'rotate(-24.0642deg)', transformOrigin: 'center 5em' }}>O</span>
              <span className="char8" style={{ position: 'absolute', left: '50%', marginLeft: '-0.178571em', transform: 'rotate(-14.8969deg)', transformOrigin: 'center 5em' }}>f</span>
              <span className="char9" style={{ position: 'absolute', left: '50%', marginLeft: '-0.142857em', transform: 'rotate(-9.74028deg)', transformOrigin: 'center 5em' }}>&nbsp;</span>
              <span className="char10" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(-2.86479deg)', transformOrigin: 'center 5em' }}>E</span>
              <span className="char11" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(6.30254deg)', transformOrigin: 'center 5em' }}>x</span>
              <span className="char12" style={{ position: 'absolute', left: '50%', marginLeft: '-0.321429em', transform: 'rotate(16.0428deg)', transformOrigin: 'center 5em' }}>p</span>
              <span className="char13" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(25.7831deg)', transformOrigin: 'center 5em' }}>e</span>
              <span className="char14" style={{ position: 'absolute', left: '50%', marginLeft: '-0.178571em', transform: 'rotate(33.8045deg)', transformOrigin: 'center 5em' }}>r</span>
              <span className="char15" style={{ position: 'absolute', left: '50%', marginLeft: '-0.142857em', transform: 'rotate(39.5341deg)', transformOrigin: 'center 5em' }}>i</span>
              <span className="char16" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(46.4096deg)', transformOrigin: 'center 5em' }}>e</span>
              <span className="char17" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(55.5769deg)', transformOrigin: 'center 5em' }}>n</span>
              <span className="char18" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(64.7442deg)', transformOrigin: 'center 5em' }}>c</span>
              <span className="char19" style={{ position: 'absolute', left: '50%', marginLeft: '-0.285714em', transform: 'rotate(73.9116deg)', transformOrigin: 'center 5em' }}>e</span>

            </span>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10 col-md-12 col-sm-12 content-column">
              <div className="about-content">
                <div className="main-title">
                  <h3>About us Branding Agency</h3>
                  <h2>Strategies For Building Growing <span className="gradient-color color-two">And Managing Your Brand’d Identity</span></h2>
                </div>
                <div className="about-text">
                  <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
                </div>
                <div className="btn-box">
                  <Link to="/about" className="primary-btn one gradient-bg white-color border-btn"><span>Learn More</span><i className="icon-1 gradient-color"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutArea;