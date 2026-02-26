import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { ContactContain, MapSection } from "../components";

const ContactPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Contact" title="Contact Us" />
      <ContactContain />
      <MapSection />
    </Layout5>
  );
};

export default ContactPage;
