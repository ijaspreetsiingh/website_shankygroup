import Count from "../../../common/Count";

 
const counter_data = [
  {
    iconClass: 'icon-33',
    count: 28,
    suffix: 'm+',
    title: 'Unique:',
    description: `URLs Checked In <br />Over 15 Years`,
  },
  {
    iconClass: 'icon-34',
    count: 85,
    suffix: '+',
    title: 'Happy',
    description: `Customers All Over <br />The World`,
  },
  {
    iconClass: 'icon-35',
    count: 100,
    suffix: '+',
    title: 'Countries',
    description: `Served with Better <br />SEO Services`,
  },
];



const CounterHomeThree = () => {
  return (
    <>
      <section className="funfact-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-35.png)` }}></div>
        <div className="container">
          <div className="main-title">
            <h2>Anyone Can Make You Promise <br /><span>We Can Give You Proof</span></h2>
          </div>
          <div className="content-box">
            <div className="row">
              {counter_data.map((item, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12 block-column">
                  <div className="funfact-block-one">
                    <div className="icon-box"><i className={item.iconClass}></i></div>
                    <div className="inner-box">
                      <div className="count-outer count-box">
                        <span className="odometer" data-count="28">
                          <Count number={item.count} text={item.suffix} />                          
                          </span> 
                      </div>
                      <p> <span className="gradient-color">{item.title}</span> <span dangerouslySetInnerHTML={{ __html: item.description }}></span></p>
                    </div>
                  </div>
                </div>
              ))}
               
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterHomeThree;