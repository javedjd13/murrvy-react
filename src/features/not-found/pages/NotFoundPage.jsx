import Layout5 from "@/components/Layout5";
import BreadCrumb from "@/components/BreadCrumb";
import { SectionSvg } from "../components";

const NotFoundPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="404" title="404" />
      <SectionSvg />
    </Layout5>
  );
};

export default NotFoundPage;
