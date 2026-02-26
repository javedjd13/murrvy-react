import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { FaqDetail, TopSection } from "../components";

const FaqPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="FAQ" title="FAQ" />
      <TopSection />
      <FaqDetail />
    </Layout5>
  );
};

export default FaqPage;
