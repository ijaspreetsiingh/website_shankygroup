 
import HeroHomeTwo from "./HeroHomeTwo";
import AboutHomeTwo from "./AboutHomeTwo";
import BrandsHomeTwo from "./BrandsHomeTwo";
import ServiceHomeTwo from "./ServiceHomeTwo";
import ChoooseusHomeTwo from "./ChoooseusHomeTwo";
import PortfolioHomeTwo from "./PortfolioHomeTwo";
import TeamHomeTwo from "./TeamHomeTwo";
import TestimonialHomeTwo from "./TestimonialHomeTwo";
import BlogHomeTwo from "./BlogHomeTwo";
import ClientsHomeTwo from "./ClientsHomeTwo";
import ContactHomeTwo from "./ContactHomeTwo"; 
import Wrapper from "../../../layouts/Wrapper";
import HeaderTwo from "../../../layouts/headers/HeaderTwo";
import FooterTwo from "../../../layouts/footers/FooterTwo";

const HomeTwo = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_three">
				<HeaderTwo />
        <HeroHomeTwo />
        <AboutHomeTwo />
        <BrandsHomeTwo />
        <ServiceHomeTwo />
        <ChoooseusHomeTwo />
        <PortfolioHomeTwo />
        <TeamHomeTwo />
        <TestimonialHomeTwo />
        <BlogHomeTwo />
        <ClientsHomeTwo />
        <ContactHomeTwo />
        <FooterTwo />
			</div>
		</Wrapper>
	);
};

export default HomeTwo;
