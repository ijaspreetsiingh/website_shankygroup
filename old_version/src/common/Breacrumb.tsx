import { Link } from "react-router-dom";

 

const Breacrumb = ({title, subtitle} : any) => {
  return (
    <>
      <section className="page-title text-center">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-55.png)` }}></div>
        <figure className="image"><img src="assets/images/resource/page-title.png" alt="" /></figure>
        <div className="clients-box">
          <ul className="clients-image">
            <li><img src="assets/images/resource/clients-1.png" alt="" /></li>
            <li><img src="assets/images/resource/clients-2.png" alt="" /></li>
            <li><img src="assets/images/resource/clients-3.png" alt="" /></li>
            <li><span className="gradient-bg">10K+</span></li>
          </ul>
          <h3>Excellent <span className="gradient-color">40.00+</span> Reviews</h3>
        </div>
        <div className="container">
          <div className="page-title-content">
            <h1>{title}</h1>
            <ul className="bread-crumb">
              <li><Link to="/">Home</Link></li>
              <li><i className="icon-13"></i></li>
              <li>{subtitle}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breacrumb;