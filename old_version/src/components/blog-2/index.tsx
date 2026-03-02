 
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/FooterFour';
import HeaderFive from '../../layouts/headers/HeaderFive';
import Wrapper from '../../layouts/Wrapper';
import CtaHomeFour from '../homes/home-4/CtaHomeFour'; 
import BlogTwoArea from './BlogTwoArea';

const BlogTwo = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Blog Standard" subtitle="Blog Standard" />
        <BlogTwoArea />
        <CtaHomeFour />
        <FooterFour />
      </div>      
    </Wrapper>
  );
};

export default BlogTwo;