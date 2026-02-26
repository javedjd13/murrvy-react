import { Search } from "react-feather";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { IS_FOCUS, IS_SEARCH } from "../../ReduxToolkit/Reducers/AllReducer";
const SearchBarWithBgColor = ({ customeClass }) => {
  const dispatch = useDispatch();
  // const router = usePathname();
   const location = useLocation();
  const router = location.router;
  const isLayout = router;
  var isBgColor = false;
  if (isLayout && !isLayout.includes("fashion") && !isLayout.includes("flower")) {
    isBgColor = true;
  }
  const toggleSearch = () => {
    dispatch(IS_SEARCH());
    dispatch(IS_FOCUS());
  };
  return (
    <li onClick={() => toggleSearch()}>
      <div className={`search-box search-box-2 theme-bg-color ${customeClass ? customeClass : ""}`}>
        <Search />
      </div>
    </li>
  );
};
export default SearchBarWithBgColor;
