 
import HeroHomeOne from "./HeroHomeOne";
import CounterHomeOne from "./CounterHomeOne";
import AboutHomeOne from "./AboutHomeOne";
import ParallaxImgHomeOne from "./ParallaxImgHomeOne";
import PortfolioHomeOne from "./PortfolioHomeOne";
import WorkingHomeOne from "./WorkingHomeOne";
import ProjectHomeOne from "./ProjectHomeOne";
import TestimonialHomeOne from "./TestimonialHomeOne";
import TeamHomeOne from "./TeamHomeOne";
import BlogHomeOne from "./BlogHomeOne";
import CtaHomeOne from "./CtaHomeOne"; 
import Wrapper from "../../../layouts/Wrapper";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";

const HomeOne = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper main-home">
				<HeaderOne />
				<HeroHomeOne />
				<CounterHomeOne />
				<AboutHomeOne />
				<ParallaxImgHomeOne />
				<PortfolioHomeOne />
				<WorkingHomeOne />
				<ProjectHomeOne />
				<TestimonialHomeOne />
				<TeamHomeOne />
				<BlogHomeOne />
				<CtaHomeOne />
				<FooterOne />
			</div>
		</Wrapper>
	);
};

export default HomeOne;
