"use client";
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

 


const PortfolioSlider = () => {
  return (
    <>
      <section className="service-section portfolio-service">
        <div className="container">
          <div className="small-title">Here are some more Project:</div>
          <div className="main-content">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              mousewheel={false}
              speed={1400} 
              watchSlidesProgress={true}
              loop={true}
              autoplay={{
                delay: 5000,
              }}
              navigation={{
                nextEl: '.prev-btn',
                prevEl: '.next-btn',
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                1920: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                700: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 30
                }
              }}
              className="service-block-slide">
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">Professional Website</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-16.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">D-Form Business Strategy</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-17.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">Application Development</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-18.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">D-Form Business Strategy</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-17.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">Application Development</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-18.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-one">
                  <div className="text-box">
                    <h3><Link to="/portfolio-details">D-Form Business Strategy</Link></h3>
                    <div className="link"><Link to="/portfolio-details"><span>View Details</span><i className="icon-1"></i></Link></div>
                  </div>
                  <div className="image-box">
                    <figure className="image"><img src="assets/images/portfolio/portfolio-17.jpg" alt="" /></figure>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="swiper-nav-btn">
            <button className="prev-btn"><i className="icon-51"></i></button>
            <button className="next-btn"><i className="icon-52"></i></button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSlider;