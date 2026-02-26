import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { RegisterSection } from "../components";

const RegisterPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Register" title="Register" />
      <RegisterSection />
    </Layout5>
  );
};

export default RegisterPage;
