

const ChoooseusHomeTwo = ({ style_2 }: any) => {
  return (
    <>
      <section className={`chooseus-section ${style_2 ? 'about-chooseus' : ''}`}>
        {style_2 ? null :
          <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-48.png)` }}></div>
        }

        <div className="container">
          <div className="title-box d-flex flex-end space-between">
            <div className="main-title">
              <h3>Why Choose Us</h3>
              <h2>Best Creative & Modern <br /><span className="gradient-color">Branding Agency</span></h2>
            </div>
            <div className="title-text">
              <p>Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio possimus.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="chooseus-image">
                <figure className="image"><img src="assets/images/resource/chooseus-1.jpg" alt="" /></figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Development</a></h3>
                    <p>And in order to make a Business Brand Advertising marketing plays An Important Role.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Global Research</a></h3>
                    <p>And in order to make a Business Brand Advertising marketing plays An Important Role.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Advantage</a></h3>
                    <p>And in order to make a Business Brand Advertising marketing plays An Important Role.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Startegy</a></h3>
                    <p>And in order to make a Business Brand Advertising marketing plays An Important Role.</p>
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

export default ChoooseusHomeTwo;