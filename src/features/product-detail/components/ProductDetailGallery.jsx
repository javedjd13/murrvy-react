import { useMemo, useState } from "react";
import { Col } from "reactstrap";
import Img from "@/components/Elements/Images";
import { resolveProductImageSrc } from "../lib";
import { getProductGalleryImages } from "../model";

const getImageValue = (image) => {
  if (typeof image === "string") {
    return image;
  }

  return image?.src ?? image?.image_url ?? image?.imageUrl;
};

const ProductDetailGallery = ({ product }) => {
  const galleryImages = useMemo(() => getProductGalleryImages(product), [product]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = galleryImages[activeIndex] || galleryImages[0];
  const activeImageSrc = getImageValue(activeImage);

  return (
    <Col md="6" className="product-gallery-column">
      <div className="degree-section product-detail-gallery">
        <div className="details-image">
          <div className="product-image-tag">
            <Img
              src={resolveProductImageSrc(activeImageSrc)}
              className="img-fluid w-100 product-main-image"
              alt={product?.name || "product"}
            />
          </div>
        </div>

        <div className="details-image-option product-detail-thumbs mt-4">
          {galleryImages.slice(0, 3).map((image, index) => (
            <button
              type="button"
              key={`${product?.id}-${index}`}
              className={`product-thumb-btn ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <Img
                src={resolveProductImageSrc(getImageValue(image))}
                className="img-fluid"
                alt={`${product?.name || "product"} ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </Col>
  );
};

export default ProductDetailGallery;
