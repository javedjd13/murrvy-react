import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { ForgotPasswordSection } from "../components";

const ForgotPasswordPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Forgot Password" title="Forgot Password" />
      <ForgotPasswordSection />
    </Layout5>
  );
};

export default ForgotPasswordPage;
