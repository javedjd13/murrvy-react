// import { CommonPath } from "@/constant";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProductDetailPath } from "@/router";
import AddToCartProduct from "../../Elements/AddToCart";
import AddToWishList from "../../Elements/AddToWishList";
import CompareProducts from "../../Elements/CompareProducts";
import DynamicRating from "../../Elements/DynamicRating";
import Img from "../../Elements/Images";
import ModelViewProduct from "../../Elements/ModelViewProduct";
import { CommonPath } from "@/Constant";

const fallbackImage = 'fashion/product/front/1.jpg';

const resolveImageSrc = (value) => {
  if (!value || typeof value !== 'string') {
    return `${CommonPath}/${fallbackImage}`;
  }

  const trimmedValue = value.trim();

  if (/^https?:\/\//i.test(trimmedValue) || trimmedValue.startsWith('/')) {
    return trimmedValue;
  }

  return `${CommonPath}/${trimmedValue}`;
};

const AllProducts = ({ currentData }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const { initialGrid } = useSelector((state) => state.AllGridReducer);

  return (
    <div className={`row g-sm-4 g-3 gx-sm-4 gx-3 mt-1 row-cols-2 custom-gy-5 product-style-2 ratio_asos product-list-section ${initialGrid}`}>
      {currentData?.map((elem) => {
        return (
          <Fragment key={elem.id}>
            {elem.category !== "vr" && (
              <div>
                <div className="product-box">
                  <div className="img-wrapper">
                    {(Array.isArray(elem?.images) && elem.images.length > 0
                      ? elem.images.slice(0, 2)
                      : [{ class: "front", src: fallbackImage }]
                    ).map((image, i) => {
                      const imageSrc =
                        typeof image === "string"
                          ? image
                          : image?.src ?? image?.image_url ?? image?.imageUrl;
                      const imageKey =
                        image?.imageId ??
                        image?.id ??
                        `${elem.id}-${i}-${imageSrc || "fallback"}`;

                      return (
                        <div className={`${image?.class || "front"}`} key={imageKey}>
                          <Link to={getProductDetailPath(elem.id)}>
                            <Img
                              alt={elem?.name || "poster"}
                              className="bg-img"
                              src={resolveImageSrc(imageSrc)}
                            />
                          </Link>
                        </div>
                      );
                    })}
                    <div className="cart-wrap">
                      <ul>
                        <AddToCartProduct elem={elem} />
                        <ModelViewProduct elem={elem} />
                        <CompareProducts elem={elem} />
                        <AddToWishList elem={elem} />
                      </ul>
                    </div>
                  </div>
                  <div className="product-details">
                    <div className="rating-details">
                      <span className="font-light grid-content">
                        {elem?.category !== "none" ? elem?.category : elem?.type}
                      </span>
                      <DynamicRating customeclass={"mt-0"} data={elem.ratingStars} />
                    </div>
                    <div className="main-price">
                      <Link className="font-default" to={getProductDetailPath(elem.id)}>
                        <h5 className="ms-0">{elem.name}</h5>
                      </Link>
                      <div className="listing-content">
                        <span className="font-light">{elem.size}</span>
                        <p className="font-light">{elem.description}</p>
                      </div>
                      <h3 className="theme-color">
                        {symbol}
                        {(elem.price * currencyValue).toFixed(2)}
                        <span className="font-light ms-1">
                          <del>
                            {symbol}
                            {(elem.mrp * currencyValue).toFixed(2)}
                          </del>
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default AllProducts;
