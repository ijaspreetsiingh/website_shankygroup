import Count from "../../../common/Count";
import counter_data from "../../../data/counter-data";

 

const CounterHomeOne = () => {
  return (
    <>
      <section className="funfact-section-two">
        <div className="outer-box">
          <div className="row">
            {counter_data.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 single-column">
                <div className="single-funfact-block">
                  <p>{item.title}</p>
                  <div className="count-outer count-box">
                    <span className="odometer" data-count="200">
                      <Count number={item.count} text={item.symbol} add_style={true} /> 
                      </span> 
                  </div>
                </div>
              </div>
            ))}
             
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterHomeOne;