"use client";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
 

const TestimonialHomeTwo = () => {
  return (
    <>
      <section className="testimonial-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-51.png)` }}></div>
        <div className="container">
          <div className="main-title text-center">
            <h3>Our Testimonial</h3>
            <h2>Our Professional <span className="gradient-color">Client Review</span></h2>
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum <br />quidem rerum facilis est et expedita distinctio possimus.</p>
          </div>
          <div className="slider-content">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              mousewheel={false}
              speed={1400} 
              watchSlidesProgress={true}
              loop={true}
              navigation={{
                nextEl: '.next-btn',
                prevEl: '.prev-btn',
              }}
              autoplay={{
                delay: 5000,
              }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                1920: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1400: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                700: {
                  slidesPerView: 1,
                  spaceBetween: 30
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 30
                }
              }}
              className="testimonial-block-slide">
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p>The best practices built-in to their SignIn and UserProfile components would take months to implement in-house, yet no sacrifice is made in terms of Enterprise extensibility or customisation to your brand.</p>
                  <div className="author-box">
                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-1.png" alt="" /></figure>
                    <div className="text">
                      <h3>Guillermo Rauch</h3>
                      <span className="designation">CEO / Vercel</span>
                    </div>
                  </div>
                  <div className="clients-logo"><a href="#"><img src="assets/images/resource/clients-logo-1.png" alt="" /></a></div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p>The best practices built-in to their SignIn and UserProfile components would take months to implement in-house, yet no sacrifice is made in terms of Enterprise extensibility or customisation to your brand.</p>
                  <div className="author-box">
                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-1.png" alt="" /></figure>
                    <div className="text">
                      <h3>Guillermo Rauch</h3>
                      <span className="designation">CEO / Vercel</span>
                    </div>
                  </div>
                  <div className="clients-logo"><a href="#"><img src="assets/images/resource/clients-logo-1.png" alt="" /></a></div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p>The best practices built-in to their SignIn and UserProfile components would take months to implement in-house, yet no sacrifice is made in terms of Enterprise extensibility or customisation to your brand.</p>
                  <div className="author-box">
                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-1.png" alt="" /></figure>
                    <div className="text">
                      <h3>Guillermo Rauch</h3>
                      <span className="designation">CEO / Vercel</span>
                    </div>
                  </div>
                  <div className="clients-logo"><a href="#"><img src="assets/images/resource/clients-logo-1.png" alt="" /></a></div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-nav">
              <div className="prev-btn nav-btn"><i className="icon-51"></i></div>
              <div className="next-btn nav-btn"><i className="icon-52"></i></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialHomeTwo;