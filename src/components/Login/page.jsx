// import BreadCrumb from "../Elements/BreadCrumb";
import BreadCrumb from "../BreadCrumb";
import Layout5 from "../Layout5";
import LoginContain from "./LoginContain";

const LoginPage1 = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Login" title="Login" />
      <LoginContain />
    </Layout5>
  );
};

export default LoginPage1;
