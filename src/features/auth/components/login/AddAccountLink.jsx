import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Img from "@/components/Elements/Images";
import { ROUTE_PATHS } from "@/router";
import FaceBookLogo from "@/assets/images/inner-page/facebook.png";
import GoogleLogo from "@/assets/images/inner-page/google.png";
import {
  Facebook,
  Google,
  Notamember,
  Orsigninwith,
  Signupnow,
} from "@/Constant";

const AddAccountLink = () => {
  return (
    <>
      <p className="sign-category">
        <span>{Orsigninwith}</span>
      </p>
      <Row className="gx-md-3 gy-3">
        <Col md="6">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <div className="social-media fb-media">
              <Img src={FaceBookLogo} className="img-fluid" alt="facebook" />
              <h6>{Facebook}</h6>
            </div>
          </a>
        </Col>
        <Col md="6">
          <a href="https://www.google.co.in/" target="_blank" rel="noreferrer">
            <div className="social-media google-media">
              <Img src={GoogleLogo} className="img-fluid" alt="google" />
              <h6>{Google}</h6>
            </div>
          </a>
        </Col>
      </Row>
      <p>
        {Notamember}
        <Link to={ROUTE_PATHS.REGISTER} className="theme-color ps-1">
          {Signupnow}
        </Link>
      </p>
    </>
  );
};
export default AddAccountLink;
