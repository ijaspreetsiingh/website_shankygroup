  
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/FooterFour';
import HeaderFive from '../../layouts/headers/HeaderFive';
import Wrapper from '../../layouts/Wrapper';
import CtaHomeFour from '../homes/home-4/CtaHomeFour'; 
import PortfolioArea from './PortfolioArea';
import PortfolioSlider from './PortfolioSlider';

const Portfolio = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Digital Agency Portfolio" subtitle="Our Portfolio" />
        <PortfolioArea />
        <PortfolioSlider />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Portfolio;