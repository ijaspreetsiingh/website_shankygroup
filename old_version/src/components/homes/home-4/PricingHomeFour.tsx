

const PricingHomeFour = ({ style_2 }: any) => {
  return (
    <>
      <section className="pricing-section">
        <div className="container">
          {style_2 ? null :
            <div className="title-box">
              <div className="main-title">
                <h3>Pricing Plan</h3>
                <h2>Our <br /><span className="gradient-color">Pricing Plan</span></h2>
              </div>
              <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum distinctio possimus.</p>
            </div>
          }
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }}></div>
                <div className="icon-box"><i className="icon-11"></i></div>
                <h3>Basic Plan</h3>
                <p>Similique sunt in culpa qui officia deserunt molli fuga Et harum possimus.</p>
                <h2>$29<span>/$Mo</span></h2>
                <a href="#" className="primary-btn one gradient-bg white-color"><span>Chose A Option</span><i className="icon-1 gradient-color"></i></a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }}></div>
                <div className="icon-box"><i className="icon-12"></i></div>
                <h3>Business Plan</h3>
                <p>Similique sunt in culpa qui officia deserunt molli fuga Et harum possimus.</p>
                <h2>$25<span>/$Mo</span></h2>
                <a href="#" className="primary-btn one gradient-bg white-color"><span>Chose A Option</span><i className="icon-1 gradient-color"></i></a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }}></div>
                <div className="icon-box"><i className="icon-9"></i></div>
                <h3>Enterprise</h3>
                <p>Similique sunt in culpa qui officia deserunt molli fuga Et harum possimus.</p>
                <h2>$23<span>/$Mo</span></h2>
                <a href="#" className="primary-btn one gradient-bg white-color"><span>Chose A Option</span><i className="icon-1 gradient-color"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingHomeFour;