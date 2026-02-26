import Layout5 from "@/components/Layout5";
import BreadCrumb from "@/components/BreadCrumb";
import AboutDetails from "@/components/BlogDetails";

const AboutPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="About Us" title="About Us" />
      <AboutDetails />
    </Layout5>
  );
};

export default AboutPage;
