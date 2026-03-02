import Count from "../../../common/Count";

 

const counter_data = [
  {
    symbol: "+",
    count: 13,
    title: `Years Of<br /> Experience`,
  },
  {
    symbol: "+",
    count: 25,
    title: `Projects <br />Worldwide`,
  },
  {
    symbol: "+",
    count: 99,
    title: `Clients <br />Worldwide`,
  },
]
const BrandsHomeTwo = ({style_2} : any) => {
  return (
    <>
      <section className={`brands-section ${style_2 ? 'about-brands' : ''}`}>
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-${style_2 ? '57' : '46'}.png)` }}></div>
        <div className="container">
          <div className="main-title text-center">
            <h2>Transforming Brands <br /><span className="gradient-color">With Creativity</span></h2>
          </div>
          <div className="brands-content">
            <div className="text-box">
              <p>Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio possimus.</p>
              <p>There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour.</p>
              <div className="btn-box"><a href="#" className="primary-btn one gradient-bg white-color border-btn">Know About Us</a></div>
            </div>
            <div className="fact-content">
              {counter_data.map((item, i) => (
                <div key={i} className="single-item">
                  <div className="count-outer count-box">
                    <span className="odometer" data-count="13">
                      <Count number={item.count} text={item.symbol} />
                      </span> 
                  </div>
                  <h5 dangerouslySetInnerHTML={{ __html: item.title }}></h5>
                </div>
              ))} 
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandsHomeTwo;