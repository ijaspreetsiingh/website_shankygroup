 
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import ServiceHomeFour from "../homes/home-4/ServiceHomeFour";
import ProcessHomeFour from "../homes/home-1/ProcessHomeFour";
import TestimonialHomeFour from "../homes/home-4/TestimonialHomeFour";
import Wrapper from "../../layouts/Wrapper";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";

 

const Service = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Digital Agency Services" subtitle="Our Services" />
        <ServiceHomeFour />
        <ProcessHomeFour />
        <TestimonialHomeFour />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Service;