"use client";

import { Link } from "react-router-dom";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const ServiceHomeFour = () => {
  return (
    <>
      <section className="service-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-7.png)` }}></div>
        <div className="container">
          <div className="title-box">
            <div className="main-title">
              <h3>Brand Services</h3>
              <h2><span className="gradient-color color-one">We Create to Brands And</span> <br /><span className="gradient-color color-two">Businesses</span> To Stand Our in <br />the Digital era</h2>
            </div>
            <div className="btn-box"><Link to="/service" className="primary-btn one gradient-bg white-color border-btn"><span>See All Services</span><i className="icon-1 gradient-color"></i></Link></div>
          </div>
          <div className="main-content">
            <Swiper
              slidesPerView={4}
              spaceBetween={24} 
              watchSlidesProgress={true}
              speed={1400}
              loop={true}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 5000,
              }}
              navigation={{
                nextEl: '.prev-btn',
                prevEl: '.next-btn',
              }}
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
                <div className="service-block-one">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-6.png)` }}></div>
                  <div className="icon-box"><i className="icon-2"></i></div>
                  <h3><Link to="/service-details">Planning</Link></h3>
                  <p>Etiam Sed odio dictum, tempus velit non, sollicitudin nutoeque. Donec quis aliquet velit.</p>
                  <div className="link-box"><Link to="/service-details"><span>View Details</span><i className="icon-6"></i></Link></div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="service-block-one">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-6.png)` }}></div>
                  <div className="icon-box"><i className="icon-3"></i></div>
                  <h3><Link to="/service-details">Branding</Link></h3>
                  <p>Etiam Sed odio dictum, tempus velit non, sollicitudin nutoeque. Donec quis aliquet velit.</p>
                  <div className="link-box"><Link to="/service-details"><span>View Details</span><i className="icon-6"></i></Link></div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="service-block-one">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-6.png)` }}></div>
                  <div className="icon-box"><i className="icon-4"></i></div>
                  <h3><Link to="/service-details">Development</Link></h3>
                  <p>Etiam Sed odio dictum, tempus velit non, sollicitudin nutoeque. Donec quis aliquet velit.</p>
                  <div className="link-box"><Link to="/service-details"><span>View Details</span><i className="icon-6"></i></Link></div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="service-block-one">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-6.png)` }}></div>
                  <div className="icon-box"><i className="icon-5"></i></div>
                  <h3><Link to="/service-details">Marketing</Link></h3>
                  <p>Etiam Sed odio dictum, tempus velit non, sollicitudin nutoeque. Donec quis aliquet velit.</p>
                  <div className="link-box"><Link to="/service-details"><span>View Details</span><i className="icon-6"></i></Link></div>
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

export default ServiceHomeFour;