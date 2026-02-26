import { addWishlistItem } from "@/lib/storage/cartWishlistStorage";
import { ROUTE_PATHS } from "@/router";
import { ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { CHANGECOMPARE } from "@/ReduxToolkit/Reducers/CompareReducer";
import { RefreshCw } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CompareProducts = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compareProducts = useSelector((state) => state.CompareReducer.compareProducts);

  const productCompare = (event) => {
    event?.preventDefault();

    if (staticActions) {
      navigate(ROUTE_PATHS.WISHLIST);
      return;
    }

    const currentCompare = Array.isArray(compareProducts) ? compareProducts : [];
    const updatedComparelist = Array.from(new Set([...currentCompare, elem?.id].filter((value) => value !== undefined && value !== null)));
    dispatch(CHANGECOMPARE(updatedComparelist));
    localStorage.setItem("compareProducts", JSON.stringify(updatedComparelist));

    const { keys } = addWishlistItem(elem || {});
    dispatch(ADDTOWISHLIST(keys));
    toast.success("Successfully added to wishlist");
  };

  return (
    <li>
      <a href="#!" onClick={productCompare} aria-label="Add to wishlist from compare action">
        <RefreshCw />
      </a>
    </li>
  );
};

export default CompareProducts;
