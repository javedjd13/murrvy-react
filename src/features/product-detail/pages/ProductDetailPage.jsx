import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { getShopProductById, shopProducts } from "@/features/shop/data/shopProducts";
import { ROUTE_PATHS } from "@/router";
import {
  ProductDetailGallery,
  ProductDetailInfo,
  ProductDetailSidebar,
  ProductDetailTabs,
} from "../components";
import "../styles/productDetail.css";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = getShopProductById(productId);

  return (
    <Layout5 isCategories={true}>
      <BreadCrumb parent="Product Page" title="Product Page" />

      <section className="section-b-space product-page-main">
        <Container>
          <Row className="gx-4 gy-5">
            <ProductDetailSidebar products={shopProducts} />

            <Col lg="9" xs="12">
              {!product ? (
                <div className="alert alert-light border text-center p-5 mb-0">
                  <h4 className="mb-2">Product not found</h4>
                  <p className="font-light mb-3">
                    Requested product ID: {productId}
                  </p>
                  <Link className="btn btn-solid" to={ROUTE_PATHS.SHOP}>
                    Back to Shop
                  </Link>
                </div>
              ) : (
                <>
                  <div className="details-items">
                    <Row className="g-4">
                      <ProductDetailGallery key={`gallery-${product.id}`} product={product} />
                      <Col md="6">
                        <ProductDetailInfo key={`info-${product.id}`} product={product} />
                      </Col>
                    </Row>
                  </div>

                  <ProductDetailTabs />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Layout5>
  );
};

export default ProductDetailPage;
