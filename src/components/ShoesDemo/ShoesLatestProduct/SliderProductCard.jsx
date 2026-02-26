import { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ShoesProductSlider } from "../../../Data/SliderSettingsData";
import { NEW, OFF } from "../../../constant/index";
import ModelViewProduct from "../../Elements/ModelViewProduct";
import CompareProducts from "../../Elements/CompareProducts";
import AddToWishList from "../../Elements/AddToWishList";
import DynamicRating from "../../Elements/DynamicRating";
import { Link } from "react-router-dom";
import AddToCartProduct from "../../Elements/AddToCart";
import { getProductDetailPath } from "@/router";
import useSlickResizeFix from "@/hooks/useSlickResizeFix";

const SliderProductCard = ({ ShoesFilterProduct }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const sliderRef = useRef(null);

  useSlickResizeFix(sliderRef, ShoesFilterProduct.length);

  return (
    <div className="product-wrapper slide-6">
      <Slider ref={sliderRef} {...ShoesProductSlider}>
        {ShoesFilterProduct.map((elem, i) => {
          const productDetailPath = elem?.id ? getProductDetailPath(elem.id) : "/shop";

          return (
            <div key={i}>
              <div className="product-box">
                <div className="img-wrapper">
                  <Link to={productDetailPath}>
                    {elem.images.map((item, i) => {
                      return <img src={item.src} className="bg-img img-fluid" alt="shoes" key={i} />;
                    })}
                  </Link>

                  <div className="label-block">
                    {elem.new && <span className="label label-black">{NEW}</span>}
                    {elem.discount > 0 && (
                      <span className="label label-theme">
                        {elem.discount}% {OFF}
                      </span>
                    )}
                  </div>
                  <div className="cart-wrap">
                    <ul>
                      <AddToCartProduct elem={elem} />
                      <ModelViewProduct elem={elem} />
                      <CompareProducts elem={elem} />
                      <AddToWishList elem={elem} />
                    </ul>
                  </div>
                </div>
                <div className="product-details text-center">
                  <h3 className="theme-color">
                    {symbol}
                    {(elem.price * currencyValue).toFixed(2)}
                    <span className="font-light ml-1">
                      {symbol}
                      {(elem.mrp * currencyValue).toFixed(2)}
                    </span>
                  </h3>
                  <Link to={productDetailPath} className="font-default">
                    <h5>{elem.name}</h5>
                  </Link>
                  <DynamicRating data={elem.ratingStars} customeclass={"mt-1"} />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderProductCard;
