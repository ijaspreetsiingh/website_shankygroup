 
import HeroHomeFour from "./HeroHomeFour";
import WhatWeDo from "./WhatWeDo";
import LegacyLeadership from "./LegacyLeadership";
import ForceForGood from "./ForceForGood";
import MediaSection from "./aboutus";
import AboutHomeFour from "./AboutHomeFour";
import IntroHomeFour from "./IntroHomeFour";
import ServiceHomeFour from "./ServiceHomeFour";
import PortfolioHomeFour from "./PortfolioHomeFour";
import ProcessHomeFour from "../home-1/ProcessHomeFour";
import TestimonialHomeFour from "./TestimonialHomeFour";
import PricingHomeFour from "./PricingHomeFour";
import FaqHomeFour from "./FaqHomeFour";
import TeamHomeFour from "./TeamHomeFour";
import BlogHomeFour from "./BlogHomeFour";
import CtaHomeFour from "./CtaHomeFour"; 
import VisionMission from "./mission";
import Wrapper from "../../../layouts/Wrapper";
import HeaderFour from "../../../layouts/headers/HeaderFour";
import FooterFour from "../../../layouts/footers/FooterFour";
import BusinessSection from "./bb_page";
import WorkWithUs from "./work";
import GlobeDemo from "./glob";
import ContactUs from "./ContactUs";
``
const HomeFour = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_four">
				<HeaderFour />
        <HeroHomeFour />
         <AboutHomeFour />
        <MediaSection />
        
        {/* <WhatWeDo /> */}
        
         
         {/* <VisionMission /> */}
          <ForceForGood />
       <LegacyLeadership />
       <GlobeDemo />
        {/* <BusinessSection /> */}
        <WorkWithUs />
        <ContactUs />

       
        <FooterFour />
			</div>
		</Wrapper>
	);
};

export default HomeFour;

 
 

 