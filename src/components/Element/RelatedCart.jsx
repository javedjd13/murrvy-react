import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import Img from "@/components/Elements/Images";
import { RelativeProductSlider } from "@/Data/SliderSettingsData";
import { getProductDetailPath } from "@/router";
import { getRelatedProducts } from "@/features/shop/data/shopProducts";
import { resolveProductImageSrc } from "@/lib/storage/cartWishlistStorage";

const RelatedCartProduct = ({ addedCartData }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const relatedProducts = useMemo(
    () => getRelatedProducts(addedCartData?.id, 8).slice(0, 4),
    [addedCartData?.id],
  );

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <div className="ratio_asos mt-4">
      <Container>
        <Row className="m-0">
          <Col sm="12" className="p-0">
            <div className="product-wrapper product-style-2 slide-4 p-0 light-arrow bottom-space spacing-slider">
              <Slider {...RelativeProductSlider}>
                {relatedProducts.map((elem, i) => {
                    const firstImage = Array.isArray(elem?.images) ? elem.images[0] : null;
                    const imageSrc =
                      typeof firstImage === "string"
                        ? firstImage
                        : firstImage?.src ?? firstImage?.image_url ?? firstImage?.imageUrl;

                    return (
                      <div key={i}>
                        <div className="product-box">
                          <div className="img-wrapper">
                            <div className="front">
                              <Link to={getProductDetailPath(elem.id)}>
                                <Img src={resolveProductImageSrc(imageSrc)} className="bg-img" alt="product-box" />
                              </Link>
                            </div>
                          </div>
                          <div className="product-details text-center">
                            <div className="rating-details d-block text-center">
                              <span className="font-light grid-content">{elem?.name}</span>
                            </div>
                            <div className="main-price mt-0 d-block text-center">
                              <h3 className="theme-color">
                                {symbol}
                                {(elem?.price * currencyValue).toFixed(2)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RelatedCartProduct;
