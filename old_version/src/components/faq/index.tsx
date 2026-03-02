 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import FaqArea from "./FaqArea";

 

const Faq = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Our FAQ" subtitle="FAQ" />
        <FaqArea />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Faq;