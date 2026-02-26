import React from "react";
import { useDispatch } from "react-redux";
import { ISDASHBOARD, OVERLAY } from "../../ReduxToolkit/Reducers/ModalReducer";
import { ShowMenu } from "../../constant";
import { Btn } from "../AbstractElements";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const MobileViewBtn = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions
  ();
  return (
    <div
      className="filter-button dash-filter dashboard"
      onClick={() => {
        width < 1200 && dispatch(ISDASHBOARD());
        dispatch(OVERLAY());
      }}
    >
      <Btn attrBtn={{ className: "btn-solid-default btn-sm fw-bold filter-btn" }}>{ShowMenu}</Btn>
    </div>
  );
};

export default MobileViewBtn;
