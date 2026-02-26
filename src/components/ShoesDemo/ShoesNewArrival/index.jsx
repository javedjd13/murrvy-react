import { Col, Container, Row } from "reactstrap";
import { NewArrival, OurCollection } from "../../../constant/index";
// import SectionHeader from "../../Element/SectionHeader";
import ShoesSliderCard from "./ShoesSliderCard";
import SectionHeader from "../../Elements/SectionHeader";
const ShoesNewArrival = ({ productData }) => {
  const SliderFilter = productData.filter((el) => el.type === "shoes");
  return (
    <section className="ratio_asos">
      <Container>
        <Row className="m-0">
          <Col sm="12" className="p-0">
            <SectionHeader title={NewArrival} subTitle={OurCollection} />
            <ShoesSliderCard SliderFilter={SliderFilter} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ShoesNewArrival;
