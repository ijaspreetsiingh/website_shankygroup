 
import { Link } from "react-router-dom";
import { useState } from "react";
import faq_data from "../../../data/faq-data";



const FaqHomeThree = () => { 
  const [faq, setFaq] = useState<number | null>(0);
  const toggleFaq = (i: number) => {
    setFaq(faq === i ? null : i);
  };


  return (
    <>
      <section className="faq-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-38.png)` }}></div>
        <div className="container">
          <div className="title-box">
            <div className="main-title">
              <h3><span className="text"><span className="gradient-color">FAQ</span></span></h3>
              <h2>Frequently Asked Questions <br /><span>Outstanding Results.</span></h2>
            </div>
            <div className="customers-support">
              <div className="image-box">
                <figure className="image"><img src="assets/images/resource/support-1.png" alt="" /> </figure>
                <div className="icon"><i className="icon-39"></i></div>
              </div>
              <div className="text-box">
                <h3>Richard Martines</h3>
                <span className="designation">Designer</span>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 col-sm-12 left-column">
              <div className="left-content">
                <h2>FAQ</h2>
                <Link to="/faq"><img src="assets/images/icons/icon-5.png" alt="" /> </Link>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 right-column">
              <div className="accordion-content-two">
                <ul className="accordion-box">
                  {faq_data.map((item, i) => (
                    <li key={i} className={`accordion block ${faq === i ? 'active-block' : ''}`}>
                      <div className={`acc-btn ${faq === i ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                        <h3>{item.question}</h3>
                        <div className="icon-box"><img src="assets/images/icons/icon-6.png" alt="" /> </div>
                        <div className="active-icon"><img src="assets/images/icons/icon-7.png" alt="" /> </div>
                      </div>
                      <div className={`acc-content ${faq === i ? 'current' : ''}`}>
                        <p>{item.answer}</p>
                      </div>
                    </li>
                  ))} 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqHomeThree;