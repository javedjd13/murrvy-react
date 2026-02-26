import { useMemo } from "react";
import { Col } from "reactstrap";
import { getSidebarBrands, PRODUCT_SERVICE_ITEMS } from "../model";

const buildBrandInputId = (brand) =>
  `brand-${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const ProductDetailSidebar = ({ products = [] }) => {
  const brands = useMemo(() => getSidebarBrands(products), [products]);

  return (
    <Col lg="3" md="4">
      <div className="product-detail-sidebar">
        <div className="product-sidebar-card">
          <h5 className="product-sidebar-heading">
            <span>Brand</span>
            <span aria-hidden="true">-</span>
          </h5>
          <div className="product-sidebar-body">
            <ul className="product-sidebar-list">
              {brands.map((brand) => {
                const inputId = buildBrandInputId(brand);

                return (
                  <li key={brand}>
                    <div className="product-sidebar-check">
                      <input
                        className="product-sidebar-checkbox"
                        type="checkbox"
                        id={inputId}
                      />
                      <label className="product-sidebar-label" htmlFor={inputId}>
                        {brand}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="product-sidebar-card product-sidebar-services">
          <div className="product-sidebar-body">
            <ul className="product-sidebar-list">
              {PRODUCT_SERVICE_ITEMS.map((service) => (
                <li key={service.key}>
                  <div className="product-sidebar-service-wrap">
                    <div className="product-sidebar-service-icon">
                      <svg>
                        <use xlinkHref={`/assets/svg/icons.svg#${service.icon}`} />
                      </svg>
                    </div>
                    <div className="product-sidebar-service-content">
                      <h3>{service.title}</h3>
                      <span>{service.description}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductDetailSidebar;
