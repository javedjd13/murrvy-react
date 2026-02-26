import { ROUTE_PATHS } from "@/router";
import { addWishlistItem } from "@/lib/storage/cartWishlistStorage";
import { ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { Heart } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddToWishList = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addtoWishList = (event) => {
    event?.preventDefault();

    if (staticActions) {
      navigate(ROUTE_PATHS.WISHLIST);
      return;
    }

    const { keys } = addWishlistItem(elem || {});
    dispatch(ADDTOWISHLIST(keys));
    toast.success("Successfully added to wishlist");
  };

  return (
    <li>
      <a href="#!" className="wishlist" onClick={addtoWishList} aria-label="Add to wishlist">
        <Heart />
      </a>
    </li>
  );
};

export default AddToWishList;
