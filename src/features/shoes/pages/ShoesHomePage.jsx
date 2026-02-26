import FlowerBrand from "@/components/FlowerBrand";
import FlowerSubscribe from "@/components/FlowerSubscribe";
import Layout5 from "@/components/Layout5";
import StartModel from "@/components/Elements/StartModel";
import FashionService from "@/components/FashionService";
import ShoesBannerMiddle from "@/components/ShoesDemo/ShoesBannerMiddle";
import ShoesCategory from "@/components/ShoesDemo/ShoesCategory";
import ShoesDeal from "@/components/ShoesDemo/ShoesDeal";
import ShoesHomeSlider from "@/components/ShoesDemo/ShoesHomeSlider";
import ShoesLatestProduct from "@/components/ShoesDemo/ShoesLatestProduct";
import ShoesNewArrival from "@/components/ShoesDemo/ShoesNewArrival";
import ShoesTopBanner from "@/components/ShoesDemo/ShoesTopBanner";
import {
  bannerData,
  categoryBanner,
  dealBannerData,
  mainSlider,
  newArrivalData,
  productData,
} from "../data/shoesHomeData";

const ShoesHomePage = () => {
  return (
    <Layout5 isCategories={true}>
      <ShoesHomeSlider mainSlider={mainSlider} />
      <FashionService removePadding={true} />
      <ShoesTopBanner bannerData={bannerData} />
      <ShoesLatestProduct productData={productData} />
      <ShoesBannerMiddle bannerData={bannerData} />
      <ShoesCategory categoryBanner={categoryBanner} />
      <ShoesNewArrival productData={newArrivalData} />
      <ShoesDeal bannerData={dealBannerData} />
      <FlowerSubscribe />
      <FlowerBrand />
      <StartModel />
    </Layout5>
  );
};

export default ShoesHomePage;
