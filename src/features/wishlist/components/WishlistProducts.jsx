import { Btn } from "@/components/AbstractElements";
import Img from "@/components/Elements/Images";
import { ContinueShopping } from "@/constant";
import { getWishlistItems } from "@/lib/storage/cartWishlistStorage";
import { ROUTE_PATHS } from "@/router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import WishlistDataList from "./WishlistDataList";

const WishlistProducts = () => {
  const navigate = useNavigate();
  useSelector((state) => state.AddToCartReducer.wishlist);
  const wishlistData = getWishlistItems();

  return (
    <section className="wish-list-section section-b-space">
      <Container>
        <Row className="justify-content-center">
          {wishlistData.length > 0 ? (
            <Col sm="12" className="table-responsive">
              <WishlistDataList wishlistData={wishlistData} />
            </Col>
          ) : (
            <Col sm="3" xs="9" className="mx-auto">
              <Img src="/assets/images/wishlistEmpty.png" className="img-fluid mb-3" alt="wishlist empty" />
              <div className="w-100 text-center">
                <h5 className="text-center mb-3">Wishlist is empty! No products were added to the Wish List</h5>
                <Btn attrBtn={{ className: "btn-solid-default", onClick: () => navigate(ROUTE_PATHS.SHOP) }}>{ContinueShopping}</Btn>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default WishlistProducts;
