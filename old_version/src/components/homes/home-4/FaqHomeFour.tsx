"use client";
import { useState } from "react";

 
export const faq_data = [
  {
    question: "1. What Services do Creative agencies offer?",
    answer:
      "If you use this site regularly and would like to help keep the site on the Internet, please consider bandwidth bill.",
  },
  {
    question: "2. How can working with a creative benefit my brand?",
    answer:
      "If you use this site regularly and would like to help keep the site on the Internet, please consider bandwidth bill.",
  },
  {
    question: "3. Do you provide both digital marketing services?",
    answer:
      "If you use this site regularly and would like to help keep the site on the Internet, please consider bandwidth bill.",
  },
];



const FaqHomeFour = () => {

  const [faq, setFaq] = useState<number | null>(0);
    const toggleFaq = (i: number) => {
      setFaq(faq === i ? null : i);
    };


  return (
    <>
      <section className="faq-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-16.png)` }}></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 left-column">
              <div className="accordion-content">
                <div className="main-title">
                  <h3>Some Question</h3>
                  <h2>Design That Where Ideas <br /><span className="gradient-color">Take The Flight</span></h2>
                </div>
                <ul className="accordion-box">
                  {faq_data.map((item, i) => (
                    <li key={i} className={`accordion block ${faq === i ? 'active-block' : ''}`}>
                    <div className={`acc-btn ${faq === i ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                      <h3>{item.question}</h3>
                      <div className="icon-box"><i className="icon-13"></i></div>
                    </div>
                    <div className={`acc-content ${faq === i ? 'current' : ''}`}>
                      <div className="content">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </li>
                  ))} 
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 right-column">
              <div className="faq-image">
                <figure className="image"><img src="assets/images/resource/faq-1.jpg" alt="" /></figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqHomeFour;