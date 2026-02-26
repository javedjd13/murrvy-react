// import { getAPIData } from "@/Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAPIData } from "../../Utils";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const AllCategories = ({ isCategories }) => {
  const { width } = useWindowDimensions();
  const [getCategoryData, setCategoryData] = useState([]);
  const [isChecked, setIsChecked] = useState("");
  const [subChild, setSubChild] = useState("");
  const { catergoryResponsive } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getAPIData(`/api/categorymenu`).then((res) => setCategoryData(res?.data));
  }, []);
  return <></>;
};
export default AllCategories;
