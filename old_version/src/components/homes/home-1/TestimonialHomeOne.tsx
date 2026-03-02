 
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

 

const TestimonialHomeOne = () => {
  return (
    <>
      <section className="testimonial-section-three">
        <div className="pattern-box" style={{ backgroundImage: `url(/assets/images/shape/shape-66.png)` }}></div>
        <div className="outer-box">
          <div className="main-title-two text-center">
            <span className="sub-title">(What Client Says?)</span>
            <h2>Our Testimonials</h2>
          </div>
          <div className="image-layer">
            <figure className="image-1"><img src="assets/images/resource/testimonial-2.png" alt="" /></figure>
            <figure className="image-2"><img src="assets/images/resource/testimonial-3.png" alt="" /></figure>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            mousewheel={false}
            speed={1400}
            watchSlidesProgress={true}
            loop={true}
            autoplay={{
              delay: 5000
            }}
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
              el: '.testimonial-pagination',
              clickable: true
            }}
            navigation={{
              nextEl: '.testimonial-next-btn',
              prevEl: '.testimonial-prev-btn',
            }}
            breakpoints={{
              1920: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              1400: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              900: {
                slidesPerView: 1,
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
            className="testimonial-block-slide-two">
            <SwiperSlide className="swiper-slide">
              <div className="testimonial-block">
                <div className="quote-icon"><img src="assets/images/icons/icon-35.png" alt="" /></div>
                <p>When we talk about axion, we do not mean a typical digital marketing partner. but rather a team that collaborate with us daily. always there for us when we encounter difficulty celebrate achievement. We see in axion our success!</p>
                <div className="author-box">
                  <figure className="author-thumb"><img src="assets/images/resource/testimonial-4.png" alt="" /></figure>
                  <div className="author-text">
                    <h5>Niko Sigurd</h5>
                    <span className="designation">CEO & Funder <br />Tesla</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="testimonial-block">
                <div className="quote-icon"><img src="assets/images/icons/icon-35.png" alt="" /></div>
                <p>When we talk about axion, we do not mean a typical digital marketing partner. but rather a team that collaborate with us daily. always there for us when we encounter difficulty celebrate achievement. We see in axion our success!</p>
                <div className="author-box">
                  <figure className="author-thumb"><img src="assets/images/resource/testimonial-4.png" alt="" /></figure>
                  <div className="author-text">
                    <h5>Niko Sigurd</h5>
                    <span className="designation">CEO & Funder <br />Tesla</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="testimonial-block">
                <div className="quote-icon"><img src="assets/images/icons/icon-35.png" alt="" /></div>
                <p>When we talk about axion, we do not mean a typical digital marketing partner. but rather a team that collaborate with us daily. always there for us when we encounter difficulty celebrate achievement. We see in axion our success!</p>
                <div className="author-box">
                  <figure className="author-thumb"><img src="assets/images/resource/testimonial-4.png" alt="" /></figure>
                  <div className="author-text">
                    <h5>Niko Sigurd</h5>
                    <span className="designation">CEO & Funder <br />Tesla</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <div className="swiper-nav">
              <div className="testimonial-prev-btn nav-btn"><img style={{cursor: "pointer"}} src="assets/images/icons/icon-36.png" alt="" /></div>
              <div className="testimonial-next-btn nav-btn"><img style={{cursor: "pointer"}} src="assets/images/icons/icon-37.png" alt="" /></div>
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default TestimonialHomeOne;