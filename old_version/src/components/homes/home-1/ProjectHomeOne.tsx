 
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

 


const ProjectHomeOne = () => {
  return (
    <>
      <section className="portfolio-section-five">
        <div className="outer-box">
          <div className="main-title text-center">
            <h2>Latest Projects</h2>
            <p>Pellentesque Pellentesque commodo tellus, in luctus sem luctus non, <br />
              Mauris dignissim viverra nisl non tempus, Fusce rhoncus, </p>
          </div>
          <div className="main-content-box">
            <Swiper
              slidesPerView={4}
              spaceBetween={24}
              mousewheel={false}
              speed={1400} 
              watchSlidesProgress={true}
              loop={true}
              autoplay={{
                delay: 5000
              }}
              pagination={{
                el: '.portfolio-pagination',
                clickable: true
              }}
              modules={[Pagination]}
              breakpoints={
                {
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
                }
              }
              className="portfolio-block-slide">
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-five">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-23.jpg" alt="" /></figure>
                  <div className="text-box">
                    <Link to="/portfolio-details" className="link">Click Now</Link>
                    <h3><Link to="/portfolio-details">Interactive Design</Link></h3>
                    <p>Branding / 2025</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-five">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-24.jpg" alt="" /></figure>
                  <div className="text-box">
                    <Link to="/portfolio-details" className="link">Click Now</Link>
                    <h3><Link to="/portfolio-details">Interactive Design</Link></h3>
                    <p>Branding / 2025</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-five">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-25.jpg" alt="" /></figure>
                  <div className="text-box">
                    <Link to="/portfolio-details" className="link">Click Now</Link>
                    <h3><Link to="/portfolio-details">Interactive Design</Link></h3>
                    <p>Branding / 2025</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-five">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-26.jpg" alt="" /></figure>
                  <div className="text-box">
                    <Link to="/portfolio-details" className="link">Click Now</Link>
                    <h3><Link to="/portfolio-details">Interactive Design</Link></h3>
                    <p>Branding / 2025</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="portfolio-block-five">
                  <figure className="image"><img src="assets/images/portfolio/portfolio-24.jpg" alt="" /></figure>
                  <div className="text-box">
                    <Link to="/portfolio-details" className="link">Click Now</Link>
                    <h3><Link to="/portfolio-details">Interactive Design</Link></h3>
                    <p>Branding / 2025</p>
                  </div>
                </div>
              </SwiperSlide>
              <div className="portfolio-pagination"></div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectHomeOne;