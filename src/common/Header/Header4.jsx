import { Col, Row } from "reactstrap";
import AllCategories from "../../components/Elements/AllCategories";
import HeadingLogo from "../../components/Elements/HeadingLogo";
import NavBar from "../../components/Elements/NavBar";
import RightHeaderDifferent from "../../components/Elements/RightHeaderDifferent";
import SearchBarToggle from "../../components/Elements/SearchBarToggle";
import { useHeaderScroll } from "../../Utils/HeaderScroll";

const Header4 = ({ noStyle, isCategories }) => {
  const UpScroll = useHeaderScroll(false);
  return (
    <header id="home" className={`custom-header ${!noStyle ? `${UpScroll ? "nav-down nav-up" : ""}` : ""}`}>
      <div className="main-header navbar-searchbar">
        <div className="container-fluid-lg">
          <Row>
            <Col lg="12">
              <div className="main-menu">
                <div className="menu-left">
                  <HeadingLogo />
                  <AllCategories isCategories={isCategories} />
                </div>
                <nav>
                  <NavBar />
                </nav>
                <RightHeaderDifferent />
                <SearchBarToggle />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};
export default Header4;
