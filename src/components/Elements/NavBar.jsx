




import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddToHome from "./AddToHome";
import ThreeBarToggle from "./ThreeBarToggle";

// import { Menu } from "../../constant";
import {
  OVERLAY,
  TOPMENUTOGGLE,
} from "../../ReduxToolkit/Reducers/ModalReducer";

import useWindowDimensions from "../../Utils/useWindowDimensions";
import { Menu } from "@/Constant";

const NavBar = ({ customClass }) => {
  const { width } = useWindowDimensions();

  const [headerData, setHeaderData] = useState([]);

  const { TopMenuToggle } = useSelector(
    (state) => state.ModalReducer
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  // ✅ Static Header Menu (No API)
  useEffect(() => {
    const staticHeader = [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Shop", path: "/shop" },
      { title: "Contact", path: "/contact" },
    ];

    setHeaderData(staticHeader);
  }, []);

  // ✅ Mobile Menu Close
  const closeMobileMenu = () => {
    if (width < 1200) {
      dispatch(TOPMENUTOGGLE());
      dispatch(OVERLAY());
    }
  };

  const closeMenuFromBack = () => {
    dispatch(TOPMENUTOGGLE());
    dispatch(OVERLAY());
  };

  // ✅ Normalize Path
  const normalizePath = (path = "/") => {
    const cleanPath = path.split("?")[0].split("#")[0];

    if (cleanPath !== "/" && cleanPath.endsWith("/")) {
      return cleanPath.slice(0, -1);
    }

    return cleanPath || "/";
  };

  const currentPath = normalizePath(pathname);

  // ✅ Active Menu Logic
  const isMenuActive = (menuPath = "/") => {
    const normalizedMenuPath = normalizePath(menuPath);

    if (normalizedMenuPath === "/") {
      return currentPath === "/";
    }

    return (
      currentPath === normalizedMenuPath ||
      currentPath.startsWith(`${normalizedMenuPath}/`)
    );
  };

  return (
    <div className="main-navbar">
      <div id="mainnav">

        {/* 🔹 Mobile Toggle */}
        <ThreeBarToggle customClass={customClass} />

        <ul
          className="nav-menu"
          style={{
            right: TopMenuToggle ? "0px" : "-410px",
          }}
        >

          {/* 🔹 Mobile Back Button */}
          <li
            className="back-btn d-xl-none"
            onClick={closeMenuFromBack}
          >
            <div className="close-btn">
              {Menu}
              <span className="mobile-back">
                <i className="fa fa-angle-left"></i>
              </span>
            </div>
          </li>

          {/* 🔹 Menu Items */}
          {headerData.map((menu, i) => {
            const menuPath = menu.path || "/";
            const isActive = isMenuActive(menuPath);

            return (
              <li
                key={i}
                className={isActive ? "active" : ""}
              >
                <Link
                  to={menuPath}
                  className={`nav-link menu-title ${
                    isActive ? "active" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  {menu.title}
                </Link>
              </li>
            );
          })}

          {/* 🔹 Add To Home Button */}
          <AddToHome />

        </ul>
      </div>
    </div>
  );
};

export default NavBar;