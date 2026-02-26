import { CommonPath } from "@/constant";
import { addCartItem, getWishlistItems, removeWishlistItem, resolveProductImageSrc } from "@/lib/storage/cartWishlistStorage";
import { ROUTE_PATHS, getProductDetailPath } from "@/router";
import { Heart, Settings } from "react-feather";
import { ADDTOCART, ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Table } from "reactstrap";
import MobileViewData from "@/pages/WishList/MobileViewData";
import { toast } from "react-toastify";

const fallbackImage = `${CommonPath}/fashion/product/front/1.jpg`;

const getFirstImageSrc = (images) => {
  const firstImage = Array.isArray(images) ? images[0] : null;
  const imageSrc = typeof firstImage === "string" ? firstImage : firstImage?.src;
  return imageSrc ? resolveProductImageSrc(imageSrc) : fallbackImage;
};

const WishList = ({ icon }) => {
  const dispatch = useDispatch();
  useSelector((state) => state.AddToCartReducer.wishlist);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const wishlistData = getWishlistItems();

  const removeProduct = (product) => {
    const { keys } = removeWishlistItem(product);
    dispatch(ADDTOWISHLIST(keys));
  };

  const addProductToCart = (product) => {
    const { keys } = addCartItem(product);
    dispatch(ADDTOCART(keys));
    toast.success("Added to cart");
  };

  return (
    <li className="onhover-dropdown wislist-dropdown">
      <div className="cart-media">
        {icon ? (
          <div className="cart-icon">
            <Settings />
          </div>
        ) : (
          <Link to={ROUTE_PATHS.WISHLIST} className="cart-icon" aria-label="Wishlist">
            <Heart />
          </Link>
        )}
      </div>

      <div className="onhover-div">
        {wishlistData.length > 0 ? (
          <Col sm="12" className="table-responsive">
            <Table className="cart-table wishlist-table">
              <tbody>
                {wishlistData.map((elem) => (
                  <tr key={elem.cartKey || elem.id}>
                    <td>
                      <Link to={getProductDetailPath(elem.id)}>
                        <img src={getFirstImageSrc(elem.images)} alt={elem.name || "product"} />
                      </Link>
                    </td>

                    <MobileViewData
                      elem={elem}
                      onRemove={() => removeProduct(elem)}
                      onAddToCart={() => addProductToCart(elem)}
                    />

                    <td>
                      <p className="fw-bold">{`${symbol}${(Number(elem.price || 0) * currencyValue).toFixed(2)}`}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ) : (
          <div className="wislist-empty">
            <i className="fab fa-gratipay"></i>
            <h6 className="mb-1">Your wishlist empty !!</h6>
            <p className="font-light mb-0">explore more and shortlist items.</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default WishList;
