 
import HeroHomeThree from "./HeroHomeThree";
import AboutHomeThree from "./AboutHomeThree";
import ServiceHomeThree from "./ServiceHomeThree";
import CounterHomeThree from "./CounterHomeThree";
import WorkingHomeThree from "./WorkingHomeThree";
import PortfolioHomeThree from "./PortfolioHomeThree";
import FaqHomeThree from "./FaqHomeThree";
import PricingHomeThree from "./PricingHomeThree";
import BlogHomeThrere from "./BlogHomeThrere";
import ContactHomeThree from "./ContactHomeThree"; 
import Wrapper from "../../../layouts/Wrapper";
import HeaderThree from "../../../layouts/headers/HeaderThree";
import FooterThree from "../../../layouts/footers/FooterThree";

const HomeThree = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_two">
        <HeaderThree />
        <HeroHomeThree />
        <AboutHomeThree />
        <ServiceHomeThree />
        <CounterHomeThree />
        <WorkingHomeThree />
        <PortfolioHomeThree />
        <FaqHomeThree />
        <PricingHomeThree />
        <BlogHomeThrere />
        <ContactHomeThree />
        <FooterThree />
      </div>
    </Wrapper>
  );
};

export default HomeThree;
