import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ISCARTADD } from "@/ReduxToolkit/Reducers/ModalReducer";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "@/lib/storage/cartWishlistStorage";
import { ROUTE_PATHS } from "@/router";

const AddToCartProduct = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddtoCart = (event) => {
    event?.preventDefault();

    if (staticActions) {
      navigate(ROUTE_PATHS.SHOP);
      return;
    }

    const { keys } = addCartItem(elem || {});
    dispatch(ADDTOCART(keys));
    dispatch(ISCARTADD({ isOpen: true, data: elem || {} }));
    toast.success("Successfully Added to Cart!!");
  };
  return (
    <li>
      <a href="#!" className="addtocart-btn" onClick={AddtoCart}>
          <ShoppingBag />
      </a>
    </li>
  );
};

export default AddToCartProduct;
