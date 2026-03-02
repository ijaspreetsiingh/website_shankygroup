"use client";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

 
const TestimonialHomeFour = () => {
  return (
    <>
      <section className="testimonial-section">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-11.png)` }}></div>
        <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-14.png)` }}></div>
        <div className="container">
          <div className="title-box">
            <div className="main-title">
              <h3>Our Client Feedback</h3>
              <h2>Our Testimonial <br /><span className="gradient-color">Project</span></h2>
            </div>
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio possimus.</p>
          </div>
          <div className="inner-container">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              mousewheel={false}
              speed={1400}
              watchSlidesProgress={true}
              loop={true}
              navigation={{
                nextEl: '.prev-btn',
                prevEl: '.next-btn',
              }}
              autoplay={{
                delay: 5000,
              }}
              modules={[Autoplay, Navigation]}
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
                <div className="testimonial-block-one">
                  <div className="block-shape" style={{ backgroundImage: `url(/assets/images/shape/shape-12.png)` }}></div>
                  <div className="block-shape-overlay" style={{ backgroundImage: `url(/assets/images/shape/shape-13.png)` }}></div>
                  <div className="clients-image"><img src="assets/images/resource/clients-4.png" alt="" /></div>
                  <p>"I can't say enough about it. Thanks for the great service. It's the perfect solution for our business. You've saved our business!"</p>
                  <div className="clients-box">
                    <figure className="image-box"><img src="assets/images/resource/clients-6.png" alt="" /></figure>
                    <div className="inner">
                      <h5>Sam Milia</h5>
                      <span className="designation">Founder & CEO</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-one">
                  <div className="block-shape" style={{ backgroundImage: `url(/assets/images/shape/shape-12.png)` }}></div>
                  <div className="block-shape-overlay" style={{ backgroundImage: `url(/assets/images/shape/shape-13.png)` }}></div>
                  <div className="clients-image"><img src="assets/images/resource/clients-5.png" alt="" /></div>
                  <p>"I can't say enough about it. Thanks for the great service. It's the perfect solution for our business. You've saved our business!"</p>
                  <div className="clients-box">
                    <figure className="image-box"><img src="assets/images/resource/clients-7.png" alt="" /></figure>
                    <div className="inner">
                      <h5>Olivia Mia</h5>
                      <span className="designation">Founder & CEO</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-one">
                  <div className="block-shape" style={{ backgroundImage: `url(/assets/images/shape/shape-12.png)` }}></div>
                  <div className="block-shape-overlay" style={{ backgroundImage: `url(/assets/images/shape/shape-13.png)` }}></div>
                  <div className="clients-image"><img src="assets/images/resource/clients-4.png" alt="" /></div>
                  <p>"I can't say enough about it. Thanks for the great service. It's the perfect solution for our business. You've saved our business!"</p>
                  <div className="clients-box">
                    <figure className="image-box"><img src="assets/images/resource/clients-6.png" alt="" /></figure>
                    <div className="inner">
                      <h5>Sam Milia</h5>
                      <span className="designation">Founder & CEO</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-one">
                  <div className="block-shape" style={{ backgroundImage: `url(/assets/images/shape/shape-12.png)` }}></div>
                  <div className="block-shape-overlay" style={{ backgroundImage: `url(/assets/images/shape/shape-13.png)` }}></div>
                  <div className="clients-image"><img src="assets/images/resource/clients-5.png" alt="" /></div>
                  <p>"I can't say enough about it. Thanks for the great service. It's the perfect solution for our business. You've saved our business!"</p>
                  <div className="clients-box">
                    <figure className="image-box"><img src="assets/images/resource/clients-7.png" alt="" /></figure>
                    <div className="inner">
                      <h5>Olivia Mia</h5>
                      <span className="designation">Founder & CEO</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialHomeFour;