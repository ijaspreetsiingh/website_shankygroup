import AboutArea from "./AboutArea";
import VideoAbout from "./VideoAbout"; 
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import TeamHomeFour from "../homes/home-4/TeamHomeFour";
import BrandsHomeTwo from "../homes/home-2/BrandsHomeTwo";
import IntroHomeFour from "../homes/home-4/IntroHomeFour";
import ClientsHomeTwo from "../homes/home-2/ClientsHomeTwo";
import ChoooseusHomeTwo from "../homes/home-2/ChoooseusHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";

const About = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper">
				<HeaderFive />
				<Breacrumb title="About Our Agency" subtitle="Creative Agency" />
				<AboutArea />
				<IntroHomeFour style_2={true} />
				<ClientsHomeTwo style_2={true} />
				<ChoooseusHomeTwo style_2={true} />
				<VideoAbout />
				<BrandsHomeTwo style_2={true} />
				<TeamHomeFour />
				<CtaHomeFour />
				<FooterFour />
			</div>
		</Wrapper>
	);
};

export default About;
