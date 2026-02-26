import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Btn } from "../AbstractElements";
// import { deletedesp, deletedesp2, deletedesp3, DeleteyourAccount, Hi, MarkEnderess, Note } from "../../constant";
import { OPENDELETEMODAL } from "../../ReduxToolkit/Reducers/ModalReducer";
import { deletedesp, deletedesp2, deletedesp3, DeleteyourAccount, Hi, MarkEnderess, Note } from "@/Constant";

const SecurityContain = () => {
  const dispatch = useDispatch();
  const deleteModal = () => {
    dispatch(OPENDELETEMODAL());
  };
  return (
    <Fragment>
      <div className="box-head">
        <h3>{DeleteyourAccount}</h3>
      </div>
      <div className="security-details">
        <h5 className="font-light mt-3">
          {Hi} <span> {MarkEnderess}</span>
        </h5>
        <p className="font-light mt-1">{deletedesp}</p>
      </div>

      <div className="security-details-1 mb-0">
        <div className="page-title">
          <h4 className="fw-bold">{Note}</h4>
        </div>
        <p className="font-light">{deletedesp2}</p>

        <p className="font-light mb-4">{deletedesp3}</p>

        <Btn attrBtn={{ className: "btn-solid-default btn-sm fw-bold rounded", onClick: deleteModal }}>{DeleteyourAccount}</Btn>
      </div>
    </Fragment>
  );
};

export default SecurityContain;
