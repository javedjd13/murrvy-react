import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import ShopLeftSidebarContain from "@/components/Shop/ShopLeftSidebarContain";
import { shopProducts } from "@/features/shop/data/shopProducts";

const ShopPage = () => {
  return (
    <Layout5 isCategories={true}>
      <BreadCrumb parent="Shop" title="Shop" />
      <ShopLeftSidebarContain productData={shopProducts} />
    </Layout5>
  );
};

export default ShopPage;
