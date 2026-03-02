 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import PricingHomeFour from "../homes/home-4/PricingHomeFour"; 

const Pricing = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper">
        <HeaderFive />
				<Breacrumb title="Pricing Plan" subtitle="Pricing Plan" />
        <PricingHomeFour style_2={true} />
				<CtaHomeFour />
				<FooterFour />
			</div>
		</Wrapper>
	);
};

export default Pricing;
