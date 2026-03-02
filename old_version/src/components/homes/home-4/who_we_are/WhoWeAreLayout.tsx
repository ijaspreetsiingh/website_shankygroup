import React from 'react';
import HeaderFour from "../../../../layouts/headers/HeaderFour";
import FooterFour from "../../../../layouts/footers/FooterFour";
import Wrapper from "../../../../layouts/Wrapper";

interface WhoWeAreLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const WhoWeAreLayout: React.FC<WhoWeAreLayoutProps> = ({ children, title }) => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_four">
        <HeaderFour />
        {children}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default WhoWeAreLayout;
