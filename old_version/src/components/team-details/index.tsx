 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import TeamHomeFour from "../homes/home-4/TeamHomeFour";
import TeamDetailsArea from "./TeamDetailsArea";

const TeamDetails = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper">
				<HeaderFive />
				<Breacrumb title="Team Details" subtitle="Team Details" />
				<TeamDetailsArea />
				<TeamHomeFour style_2={true} />
				<CtaHomeFour />
				<FooterFour />
			</div>
		</Wrapper>
	);
};

export default TeamDetails;
