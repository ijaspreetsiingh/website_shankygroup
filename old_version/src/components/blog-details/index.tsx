 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/FooterFour";
import HeaderFive from "../../layouts/headers/HeaderFive";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/home-4/CtaHomeFour"; 
import BlogDetailsArea from "./BlogDetailsArea";

 

const BlogDetails = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <HeaderFive />
        <Breacrumb title="Blog Details" subtitle="Blog Details" />
        <BlogDetailsArea />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default BlogDetails;