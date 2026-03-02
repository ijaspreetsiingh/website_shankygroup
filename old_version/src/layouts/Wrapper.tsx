 
 

import BackToTop from "../common/BackToTop";
import ScrollToTop from "../common/scroll-to-top";

const Wrapper = ({ children }: any) => {
	return <>
  {children}
  <ScrollToTop />
  <BackToTop />

  </>;
};

export default Wrapper;
