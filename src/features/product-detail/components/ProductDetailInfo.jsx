import { useState } from "react";
import { useDispatch } from "react-redux";
import { Progress } from "reactstrap";
import { toast } from "react-toastify";
import {
  Addtocart,
  BestSeller,
  Color,
  freeshipping,
  HurryUpLeft,
  instock,
  OFF,
  orderIn,
  Orderget,
  ProductName,
  quentityname,
  selectsize,
  shareit,
  sizechart,
  wishlist,
  activeView,
} from "@/Constant";
import { addCartItem, addWishlistItem } from "@/lib/storage/cartWishlistStorage";
import { ADDTOCART, ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ISCARTADD } from "@/ReduxToolkit/Reducers/ModalReducer";
import { getColorLabel, getColorStyle } from "../lib";
import {
  MAX_PURCHASE_QUANTITY,
  MIN_PURCHASE_QUANTITY,
  getProductColorOptions,
  getProductMrp,
  getProductPrice,
  getProductSizeOptions,
  getProductStock,
  getProductStockProgress,
} from "../model";

const ProductDetailInfo = ({ product }) => {
  const dispatch = useDispatch();
  const colorOptions = getProductColorOptions(product);
  const sizeOptions = getProductSizeOptions(product);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [quantity, setQuantity] = useState(MIN_PURCHASE_QUANTITY);

  const stock = getProductStock(product);
  const stockProgress = getProductStockProgress(stock);
  const price = getProductPrice(product);
  const mrp = getProductMrp(product);

  const handleAddToWishlist = () => {
    const { keys } = addWishlistItem(product || {});
    dispatch(ADDTOWISHLIST(keys));
    toast.success(`${wishlist} added for ${product?.name || ProductName}`);
  };

  const handleAddToCart = () => {
    const productWithQty = {
      ...(product || {}),
      qty: quantity,
    };

    const { keys } = addCartItem(productWithQty);
    dispatch(ADDTOCART(keys));
    dispatch(ISCARTADD({ isOpen: true, data: productWithQty }));
    toast.success(`${Addtocart} - ${product?.name || ProductName}`);
  };

  const handleDecrementQuantity = () => {
    setQuantity((previous) =>
      previous > MIN_PURCHASE_QUANTITY ? previous - 1 : MIN_PURCHASE_QUANTITY,
    );
  };

  const handleIncrementQuantity = () => {
    setQuantity((previous) =>
      previous < MAX_PURCHASE_QUANTITY ? previous + 1 : MAX_PURCHASE_QUANTITY,
    );
  };

  return (
    <div className="cloth-details-size product-detail-info">
      <div className="product-stats-bar">
        <span>
          <i className="fas fa-bolt" /> 37{orderIn}
        </span>
        <span>
          <i className="fas fa-user" /> 44{activeView}
        </span>
      </div>

      <div className="details-image-concept">
        <h2>{(product?.name || ProductName).toUpperCase()}</h2>
      </div>

      <div className="label-section">
        <span className="badge badge-grey-color">{BestSeller}</span>
        <span className="label-text">in {String(product?.type || "Shoes").toLowerCase()}</span>
      </div>

      <h3 className="price-detail">
        ${price.toFixed(0)} <del>${mrp.toFixed(0)}.00</del>
        <span>
          {Number(product?.discount || 0)}% {OFF}
        </span>
      </h3>

      <div className="color-selector">
        <h5>{Color} :</h5>
        <ul className="image-section">
          {colorOptions.map((color, index) => (
            <li key={`${product?.id}-color-${index}`}>
              <button
                type="button"
                title={getColorLabel(color)}
                className={`product-color-btn ${activeColor === index ? "active" : ""}`}
                onClick={() => setActiveColor(index)}
                style={getColorStyle(color)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="addeffect-section product-description border-product">
        <h6 className="product-title size-text">
          {selectsize}
          <span className="size-chart-link">{sizechart}</span>
        </h6>

        <div className="size-box">
          <ul>
            {sizeOptions.map((size, index) => (
              <li
                key={`${product?.id}-size-${size}`}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                <button type="button" className="size-option-btn">
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <h6 className="product-title product-title-2 d-block">{quentityname}</h6>
        <div className="qty-box">
          <div className="input-group">
            <button
              type="button"
              className="btn quantity-left-minus"
              onClick={handleDecrementQuantity}
            >
              <i className="fas fa-minus" />
            </button>
            <input type="text" className="form-control input-number" value={quantity} readOnly />
            <button
              type="button"
              className="btn quantity-right-plus"
              onClick={handleIncrementQuantity}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      </div>

      <div className="product-buttons">
        <button type="button" className="btn btn-solid" onClick={handleAddToWishlist}>
          <i className="fa fa-bookmark" />
          <span>{wishlist}</span>
        </button>
        <button
          type="button"
          className="btn btn-solid hover-solid btn-animation"
          onClick={handleAddToCart}
        >
          <i className="fa fa-shopping-cart" />
          <span>{Addtocart}</span>
        </button>
      </div>

      <ul className="product-count shipping-order">
        <li>
          <i className="fas fa-truck" />
          <span className="lang">{freeshipping}</span>
        </li>
      </ul>

      <div className="mt-2 mt-md-3 border-product">
        <h6 className="product-title hurry-title d-block">
          {HurryUpLeft}
          <span>{stock}</span> {instock}
        </h6>
        <Progress value={stockProgress} />
        <div className="font-light timer-5">
          <h5>{Orderget}</h5>
          <p className="mb-0">0 Days : 0 Hour : 0 Min : 0 Sec</p>
        </div>
      </div>

      <div className="border-product">
        <h6 className="product-title d-block">{shareit}</h6>
        <div className="product-icon">
          <ul className="product-social">
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-google-plus-g" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
