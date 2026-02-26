import React from "react";
import Cookie from "../common/Cookie/index";
import ThemeCustomizer from "../common/Customizer/index";
import Footers from "../common/Footer/index";
import Header4 from "../common/Header/Header4";
import StarterLoader from "../common/Loader";
import TapTop from "../common/TapTop";
import CommonModel from "./Element/CommonModel";
import CartSuccessModal from "./Element/CartSuccessModal";

const Layout5 = ({ children, isCategories }) => {
  const QuestionTab = true;
  return (
    <>
      <StarterLoader />
      <Header4 isCategories={isCategories} />
      {children}
      <CommonModel />
      <CartSuccessModal />
      <ThemeCustomizer />
      <Cookie />
      <TapTop />
      <Footers QuestionTab={QuestionTab} />
    </>
  );
};
export default Layout5;
