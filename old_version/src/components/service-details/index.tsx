 
import FaqHomeFour from "../homes/home-4/FaqHomeFour";
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import ServiceDetailsArea from "./ServiceDetailsArea";
import Wrapper from "../../layouts/Wrapper";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";

 

const ServiceDetails = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper"> 
        <HeaderFive />
        <Breacrumb title="Digital Branding Agency" subtitle="Services Details" />
        <ServiceDetailsArea />
        <FaqHomeFour />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default ServiceDetails;