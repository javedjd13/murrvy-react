import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Color, ContinueShopping, Qty, SuccessAddtocart, TOTAL, VIEWCART } from "@/constant";
import RelatedCartProduct from "./RelatedCart";
import { Btn } from "@/components/AbstractElements";
import Img from "@/components/Elements/Images";
import { ISCARTADD } from "@/ReduxToolkit/Reducers/ModalReducer";
import { resolveProductImageSrc } from "@/lib/storage/cartWishlistStorage";
import { ROUTE_PATHS } from "@/router";

const CartSuccessModal = () => {
  const dispatch = useDispatch();
  const { addToCartModal, addedCartData } = useSelector((state) => state.ModalReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const selectedColor =
    typeof addedCartData?.colors?.[0] === "string"
      ? addedCartData.colors[0]
      : addedCartData?.colors?.[0]?.color_name || "-";

  const firstImage = Array.isArray(addedCartData?.images) ? addedCartData.images[0] : null;
  const firstImageSrc =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.src ?? firstImage?.image_url ?? firstImage?.imageUrl;

  const toggle = () => {
    dispatch(ISCARTADD({ isOpen: false }));
  };
  return (
    <Modal className="cart-modal" fade={false} centered={true} size="lg" isOpen={addToCartModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <Btn attrBtn={{ type: "button", className: "btn-close", onClick: () => toggle() }}></Btn>
      </ModalHeader>
      <ModalBody>
        <div className="modal-contain">
          <div>
            <div className="modal-messages">
              <i className="fas fa-check"></i> {addedCartData?.name || "Product"} {SuccessAddtocart}
            </div>
            <div className="modal-product">
              <div className="modal-contain-img">
                <Img src={resolveProductImageSrc(firstImageSrc)} className="img-fluid" alt="product" />
              </div>
              <div className="modal-contain-details">
                <h4>{addedCartData?.name ? addedCartData?.name : "Premier Cropped Skinny Jean"}</h4>
                <p className="font-light my-2">
                  {Color} : {String(selectedColor).toUpperCase()} , {Qty} : 1
                </p>
                <div className="product-total">
                  <h5>
                    {TOTAL} : {symbol}
                    <span>{addedCartData?.price ? (addedCartData?.price * currencyValue).toFixed(2) : "0.00"}</span>
                  </h5>
                </div>
                <div className="shop-cart-button mt-3">
                  <Link to={ROUTE_PATHS.SHOP} className="btn default-light-theme conti-button default-theme default-theme-2 rounded" onClick={() => toggle()}>
                    {ContinueShopping}
                  </Link>
                  <Link to={ROUTE_PATHS.CART} className="btn default-light-theme conti-button default-theme default-theme-2 rounded" onClick={() => toggle()}>
                    {VIEWCART}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <RelatedCartProduct addedCartData={addedCartData} />
        </div>
      </ModalBody>
    </Modal>
  );
};
export default CartSuccessModal;
