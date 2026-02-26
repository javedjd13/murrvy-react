import { getProductDetailPath } from "@/router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";

const MobileViewData = ({ elem, onRemove, onAddToCart }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  return (
    <td>
      <Link to={getProductDetailPath(elem.id)} className="font-light">
        {elem.name}
      </Link>
      <Row className="mobile-cart-content">
        <div className="col">
          <p>{Number(elem.inStock || 0) > 0 ? "In Stock" : "Out of Stock"}</p>
        </div>
        <div className="col">
          <p className="fw-bold">{`${symbol}${(Number(elem.price || 0) * currencyValue).toFixed(2)}`}</p>
        </div>
        <div className="col">
          <h2 className="td-color">
            <button className="icon btn p-0" onClick={onRemove} aria-label="Remove from wishlist">
              <i className="fas fa-times"></i>
            </button>
          </h2>
          <h2 className="td-color">
            <button className="icon btn p-0" onClick={onAddToCart} aria-label="Add to cart">
              <i className="fas fa-shopping-cart"></i>
            </button>
          </h2>
        </div>
      </Row>
    </td>
  );
};

export default MobileViewData;
