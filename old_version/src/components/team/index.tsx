 
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/FooterFour';
import HeaderFive from '../../layouts/headers/HeaderFive';
import Wrapper from '../../layouts/Wrapper';
import CtaHomeFour from '../homes/home-4/CtaHomeFour'; 
import TeamArea from './TeamArea';

const Team = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Our Creative Member" subtitle="Our Team" />
        <TeamArea />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Team;