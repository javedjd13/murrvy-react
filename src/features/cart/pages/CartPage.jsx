import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { Btn } from "@/components/AbstractElements";
import Img from "@/components/Elements/Images";
import {
  ApplyCoupon,
  CartTotals,
  cartDescription,
  CheckOut,
  clearallitems,
  ContinueShopping,
  ConvenienceFee,
  CouponDiscount,
  image,
  minutes,
  price,
  ProcessCheckout,
  ProductName,
  quentityname,
  TotalMRP,
} from "@/constant";
import {
  clearCartItems,
  getCartItems,
  removeCartItem,
  resolveProductImageSrc,
  updateCartItemQty,
} from "@/lib/storage/cartWishlistStorage";
import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ROUTE_PATHS, getProductDetailPath } from "@/router";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Input, Row, Table } from "reactstrap";
import { toast } from "react-toastify";

const CartSection = () => {
  useSelector((state) => state.AddToCartReducer.product);
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const cartItems = getCartItems();

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item?.price || 0) * Number(item?.qty || 1),
        0,
      ),
    [cartItems],
  );

  const couponDiscountValue = isCouponApplied ? 25 : 0;
  const convenienceFeeValue = 25;
  const totalMrp = Math.max(0, subtotal - couponDiscountValue + convenienceFeeValue);

  const syncCartState = (payload) => {
    dispatch(ADDTOCART(payload?.keys || []));
  };

  const handleRemove = (product) => {
    syncCartState(removeCartItem(product));
    toast.success("Successfully Remove Product");
  };

  const handleQuantityChange = (product, inputValue) => {
    const quantity = Number.parseInt(inputValue, 10);
    if (!Number.isFinite(quantity) || quantity < 1) {
      return;
    }

    syncCartState(updateCartItemQty(product, quantity));
  };

  const handleApplyCoupon = () => {
    const shouldApply = couponCode.trim().length > 0;
    setIsCouponApplied(shouldApply);
    toast.success(shouldApply ? "Coupon applied successfully" : "Coupon removed");
  };

  const handleClearCart = () => {
    syncCartState(clearCartItems());
    toast.success("Cart cleared successfully");
  };

  return (
    <section className="cart-section section-b-space">
      <Container>
        {cartItems.length > 0 ? (
          <>
            <Row>
              <Col sm="12">
                <div className="count-down">
                  <h5>
                    {cartDescription}
                    <b className="theme-color ms-1 me-1">00:14:15</b>
                    {minutes}
                  </h5>
                  <Link to={ROUTE_PATHS.CHECKOUT} className="btn btn-solid-default btn-sm">
                    {CheckOut}
                  </Link>
                </div>
              </Col>

              <Col sm="12" className="table-responsive">
                <Table className="cart-table">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">{image}</th>
                      <th scope="col">{ProductName}</th>
                      <th scope="col">{price}</th>
                      <th scope="col">{quentityname}</th>
                      <th scope="col">action</th>
                      <th scope="col">total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const firstImage = Array.isArray(item?.images) ? item.images[0] : null;
                      const imageSrc = typeof firstImage === "string" ? firstImage : firstImage?.src;
                      const unitPrice = Number(item?.price || 0);
                      const quantity = Number(item?.qty || 1);
                      const lineTotal = unitPrice * quantity;

                      return (
                        <tr key={item.cartKey || item.id}>
                          <td>
                            <Link to={getProductDetailPath(item.id)}>
                              <Img src={resolveProductImageSrc(imageSrc)} alt={item?.name || "product"} />
                            </Link>
                          </td>
                          <td>
                            <Link to={getProductDetailPath(item.id)}>{item?.name || "Product"}</Link>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {(unitPrice * currencyValue).toFixed(0)}
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <Input
                                  type="number"
                                  className="form-control input-number"
                                  min={1}
                                  value={quantity}
                                  onChange={(event) => handleQuantityChange(item, event.target.value)}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              className="icon btn p-0"
                              onClick={() => handleRemove(item)}
                              aria-label="Remove from cart"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {(lineTotal * currencyValue).toFixed(0)}
                            </h2>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="cart-buttons">
              <Col lg="7">
                <div className="left-side-button">
                  <Link to={ROUTE_PATHS.SHOP} className="btn btn-solid-default btn fw-bold ms-0">
                    <i className="fas fa-arrow-left me-2"></i>
                    {ContinueShopping}
                  </Link>
                </div>
              </Col>
              <Col lg="5">
                <a href="#!" className="text-decoration-underline theme-color" onClick={handleClearCart}>
                  {clearallitems}
                </a>
              </Col>
            </Row>

            <section className="cart-checkout-section">
              <Row className="g-4">
                <Col lg="8">
                  <div className="promo-section">
                    <Row className="g-2">
                      <Col md="4">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(event) => setCouponCode(event.target.value)}
                        />
                      </Col>
                      <Col md="3">
                        <Btn attrBtn={{ className: "btn btn-solid-default", onClick: handleApplyCoupon }}>
                          {ApplyCoupon}
                        </Btn>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg="4">
                  <div className="cart-box">
                    <div className="cart-box-details">
                      <div className="total-details">
                        <div className="top-details">
                          <h3>{CartTotals}</h3>
                          <h6>
                            {CouponDiscount}
                            <span>
                              -{symbol}
                              {(couponDiscountValue * currencyValue).toFixed(2)}
                            </span>
                          </h6>
                          <h6>
                            {ConvenienceFee}
                            <span>
                              +{symbol}
                              {(convenienceFeeValue * currencyValue).toFixed(2)}
                            </span>
                          </h6>
                          <h6>
                            {TotalMRP}
                            <span>
                              {symbol}
                              {(totalMrp * currencyValue).toFixed(2)}
                            </span>
                          </h6>
                        </div>
                        <div className="bottom-details">
                          <Link to={ROUTE_PATHS.CHECKOUT}>{ProcessCheckout}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </>
        ) : (
          <div className="empty-box text-center py-5">
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="font-light mb-4">Start adding products from the shop page.</p>
            <Link to={ROUTE_PATHS.SHOP} className="btn btn-solid-default">
              {ContinueShopping}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

const CartPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Cart" title="Cart" />
      <CartSection />
    </Layout5>
  );
};

export default CartPage;
