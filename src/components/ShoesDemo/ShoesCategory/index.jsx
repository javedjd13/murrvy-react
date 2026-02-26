import { Col, Container, Row } from 'reactstrap';
import { OurCategory, OurCollection } from '../../../constant/index';
import CategoryCard from './CategoryCard';
import SectionHeader from '../../Elements/SectionHeader';
const ShoesCategory = ({ categoryBanner }) => {
  const ShoesFilter = categoryBanner.filter((el) => el.type === 'shoes');
  return (
    <section className='category-section'>
      <Container fluid={true}>
        <Row>
          <Col lg='12'>
            <SectionHeader title={OurCategory} subTitle={OurCollection} />
          </Col>
        </Row>
        <CategoryCard ShoesFilter={ShoesFilter} />
      </Container>
    </section>
  );
};
export default ShoesCategory;
