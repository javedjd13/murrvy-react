import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { ROUTE_PATHS } from "@/router";
import BoxAnimationSection from "./BoxAnimationSection";

const BreadCrumb = (props) => {
  const { parent = "", title = "" } = props;
  return (
    <section className="breadcrumb-section section-b-space">
      <BoxAnimationSection />
      <Container>
        <Row>
          <Col xs="12">
            <h3>{title}</h3>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={ROUTE_PATHS.HOME}>
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {parent}
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BreadCrumb;
