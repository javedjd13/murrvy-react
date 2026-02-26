import { toast } from "react-toastify";
import { Btn } from "@/components/AbstractElements";
import { Addtocart } from "@/constant";
import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ISCARTADD } from "@/ReduxToolkit/Reducers/ModalReducer";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/lib/storage/cartWishlistStorage";

const AddtoCartBtn = ({ customeclass, data, btn }) => {
  const dispatch = useDispatch();
  const addtoCart = (event) => {
    event?.preventDefault();

    const { keys } = addCartItem(data || {});
    dispatch(ADDTOCART(keys));
    dispatch(ISCARTADD({ isOpen: true, data: data || {} }));
    toast.success("Successfully Added to Cart!!");
  };
  return (
    <>
      {btn ? (
        <Btn attrBtn={{ className: customeclass, onClick: addtoCart }}>{Addtocart}</Btn>
      ) : (
        <a href="#!" className={customeclass} onClick={addtoCart}>
          {Addtocart}
        </a>
      )}
    </>
  );
};

export default AddtoCartBtn;
