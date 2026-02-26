import Layout5 from "@/components/Layout5";
import BreadCrumb from "@/components/BreadCrumb";
import { LoginContain } from "../components";

const LoginPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Login" title="Login" />
      <LoginContain />
    </Layout5>
  );
};

export default LoginPage;
