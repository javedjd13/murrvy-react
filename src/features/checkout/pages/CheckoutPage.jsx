import { Billingaddress } from "@/constant";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@/components/BreadCrumb";
import Layout5 from "@/components/Layout5";
import { CheckoutForm, SideBarCartBox } from "../components";

const CheckoutPage = () => {
  return (
    <Layout5 isCategories={false}>
      <BreadCrumb parent="Checkout" title="Checkout" />
      <section className="section-b-space">
        <Container>
          <Row className="g-4">
            <Col lg="8">
              <h3 className="mb-3">{Billingaddress}</h3>
              <CheckoutForm />
            </Col>
            <SideBarCartBox />
          </Row>
        </Container>
      </section>
    </Layout5>
  );
};

export default CheckoutPage;
