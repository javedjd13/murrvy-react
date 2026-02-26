import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { OrderTracking } from "../components";

const OrderTrackingPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Order Tracking" title="Order Tracking" />
      <OrderTracking />
    </Layout5>
  );
};

export default OrderTrackingPage;
