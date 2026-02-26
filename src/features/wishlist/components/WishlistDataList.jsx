import Img from "@/components/Elements/Images";
import { ADDTOCART, ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { getProductDetailPath } from "@/router";
import { addCartItem, removeWishlistItem, resolveProductImageSrc } from "@/lib/storage/cartWishlistStorage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import WishlistTableHead from "./WishlistTableHead";
import MobileViewData from "./MobileViewData";
import { toast } from "react-toastify";

const getFirstImageSrc = (images) => {
  const firstImage = Array.isArray(images) ? images[0] : null;
  const imageSrc = typeof firstImage === "string" ? firstImage : firstImage?.src;
  return resolveProductImageSrc(imageSrc);
};

const WishlistDataList = ({ wishlistData }) => {
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

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
    <Table className="cart-table wishlist-table">
      <WishlistTableHead />
      <tbody>
        {wishlistData?.map((elem) => {
          return (
            <tr key={elem.cartKey || elem.id}>
              <td>
                <Link to={getProductDetailPath(elem.id)}>
                  <Img src={getFirstImageSrc(elem.images)} alt={elem.name || "product"} />
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
              <td>
                <p>{Number(elem.inStock || 0) > 0 ? "In Stock" : "Out of Stock"}</p>
              </td>
              <td>
                <button className="icon btn" onClick={() => removeProduct(elem)} aria-label="Remove from wishlist">
                  <i className="fas fa-times"></i>
                </button>
                <button className="icon btn" onClick={() => addProductToCart(elem)} aria-label="Add to cart">
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default WishlistDataList;
