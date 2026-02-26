import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { OrderDetails, TopSection } from "../components";

const OrderSuccessPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Order Success" title="Order Success" />
      <TopSection />
      <OrderDetails />
    </Layout5>
  );
};

export default OrderSuccessPage;
