import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { WishlistProducts } from "../components";

const WishlistPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Wishlist" title="Wishlist" />
      <WishlistProducts />
    </Layout5>
  );
};

export default WishlistPage;
