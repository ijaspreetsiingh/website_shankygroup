 
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/FooterFour';
import HeaderFive from '../../layouts/headers/HeaderFive';
import Wrapper from '../../layouts/Wrapper';
import CtaHomeFour from '../homes/home-4/CtaHomeFour'; 
import BlogArea from './BlogArea';

const Blog = () => {
  return (
    <Wrapper>
      <div className='boxed_wrapper'>
        <HeaderFive />
        <Breacrumb title="Our Blog" subtitle="Our Blog" />
        <BlogArea />
        <CtaHomeFour />
        <FooterFour />
      </div>      
    </Wrapper>
  );
};

export default Blog;