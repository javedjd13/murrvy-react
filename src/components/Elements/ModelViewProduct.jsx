import React from "react";
import { Eye } from "react-feather";
import { useDispatch } from "react-redux";
import { IS_MODAL } from "../../ReduxToolkit/Reducers/ModalReducer";

const ModelViewProduct = ({ elem }) => {
  const dispatch = useDispatch();
  const ModelOpen = (e) => {
    e.preventDefault();
    dispatch(IS_MODAL({ isOpen: true, data: elem || {} }));
  };

  return (
    <li>
      <a href="#!" onClick={ModelOpen} aria-label="View product quick details">
        <Eye />
      </a>
    </li>
  );
};

export default ModelViewProduct;
