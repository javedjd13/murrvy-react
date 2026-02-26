import { Btn } from "@/components/AbstractElements";
import {
  getCartItems,
  removeCartItem,
  resolveProductImageSrc,
} from "@/lib/storage/cartWishlistStorage";
import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ROUTE_PATHS } from "@/router";
import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart } from "react-feather";
import { Media } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const ItemCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  useSelector((state) => state.AddToCartReducer.product);
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  const cartItems = getCartItems();
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item?.price || 0) * Number(item?.qty || 1),
    0,
  );

  const toggle = () => {
    setIsCartOpen((previousState) => !previousState);
  };

  const removeProduct = (product) => {
    const { keys } = removeCartItem(product);
    dispatch(ADDTOCART(keys));
    toast.success("Successfully Remove Product");
  };

  return (
    <li className={`onhover-dropdown cart-dropdown${isCartOpen ? " show" : ""}`}>
      <Btn
        attrBtn={{
          type: "button",
          className: "btn-solid-default btn-spacing",
          onClick: toggle,
        }}
      >
        <ShoppingCart className="pe-sm-2" />
        <span>
          {symbol}
          {(totalPrice * currencyValue).toFixed(2)}
        </span>
      </Btn>

      <div className="onhover-div">
        <div className="cart-menu">
          <div className="cart-title">
            <h6>
              <ShoppingBag />
              <span className="label label-theme rounded-pill">{cartItems.length}</span>
            </h6>
            <span className="d-md-none d-block" onClick={toggle}>
              <i className="fas fa-arrow-right back-cart"></i>
            </span>
          </div>

          <ul className="custom-scroll">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const firstImage = Array.isArray(item?.images) ? item.images[0] : null;
                const imageSrc = typeof firstImage === "string" ? firstImage : firstImage?.src;
                const resolvedImageSrc = resolveProductImageSrc(imageSrc);

                return (
                  <li key={item.cartKey || item.id}>
                    <Media>
                      <img src={resolvedImageSrc} className="img-fluid" alt={item?.name || "product"} />
                      <Media body>
                        <h6>{item?.name || "Product"}</h6>
                        <div className="qty-with-price">
                          <span>
                            {symbol} {(Number(item?.price || 0) * currencyValue).toFixed(2)}
                          </span>
                          <span>Qty : {Number(item?.qty || 1)}</span>
                        </div>
                      </Media>
                      <Btn
                        attrBtn={{
                          className: "btn-close",
                          onClick: () => removeProduct(item),
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </Btn>
                    </Media>
                  </li>
                );
              })
            ) : (
              <li className="wislist-empty">
                <i className="fas fa-shopping-cart"></i>
                <h6 className="mb-1">Your cart empty !!</h6>
                <p className="font-light mb-0">Explore products and add items to cart.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="cart-btn">
          <h6 className="cart-total">
            <span>Total</span>
            <span>
              {symbol}
              {(totalPrice * currencyValue).toFixed(2)}
            </span>
          </h6>
          <Link to={ROUTE_PATHS.CART} className="btn btn-solid-default btn-block" onClick={toggle}>
            View Cart
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ItemCart;
