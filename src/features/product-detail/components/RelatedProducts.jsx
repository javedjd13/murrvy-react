import { useMemo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import DynamicRating from "@/components/Elements/DynamicRating";
import Img from "@/components/Elements/Images";
import { CustomersAlsoBoughtThese } from "@/constant";
import { getProductDetailPath } from "@/router";
import { resolveProductImageSrc } from "../lib";

const chunkData = (items, chunkSize) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
};

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 450,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const getCardImageValue = (product) => {
  const firstImage = product?.images?.[0];

  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.src ?? firstImage?.image_url ?? firstImage?.imageUrl;
};

const RelatedProducts = ({ products = [] }) => {
  const groupedProducts = useMemo(() => chunkData(products, 4), [products]);

  if (!products.length) {
    return null;
  }

  return (
    <section className="ratio_asos section-b-space overflow-hidden">
      <Container>
        <Row>
          <Col xs="12">
            <h2 className="mb-lg-4 mb-3">{CustomersAlsoBoughtThese}</h2>
            <Slider {...sliderSettings}>
              {groupedProducts.map((group, index) => (
                <div key={`related-slide-${index}`}>
                  <div className="row g-sm-4 g-3 gx-sm-4 gx-3 mt-1 row-cols-2 row-cols-lg-4 custom-gy-5 product-style-2 ratio_asos product-list-section">
                    {group.map((product) => (
                      <div key={product.id}>
                        <div className="product-box">
                          <div className="img-wrapper">
                            <div className="front">
                              <Link to={getProductDetailPath(product.id)}>
                                <Img
                                  alt={product?.name || "product"}
                                  className="bg-img"
                                  src={resolveProductImageSrc(getCardImageValue(product))}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="product-details">
                            <div className="rating-details">
                              <span className="font-light grid-content">{product?.type}</span>
                              <DynamicRating
                                customeclass="mt-0"
                                data={product?.ratingStars || 4}
                              />
                            </div>
                            <div className="main-price">
                              <Link className="font-default" to={getProductDetailPath(product.id)}>
                                <h5 className="ms-0">{product?.name}</h5>
                              </Link>
                              <h3 className="theme-color">
                                ${Number(product?.price || 0).toFixed(2)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RelatedProducts;
