import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import CenterImage from './CenterImage';
import FormatDetails from './FormatDetails';
import LeftSidebar from './LeftSidebar';

const fallbackAboutDetails = [
  {
    id: 1,
    type: 'blogDetails',
    image: '',
    social: [
      { id: 1, class: 'fab fa-facebook-f', link: 'https://www.facebook.com/' },
      { id: 2, class: 'fab fa-twitter', link: 'https://twitter.com/' },
      { id: 3, class: 'fab fa-pinterest-p', link: 'https://www.pinterest.com/' },
    ],
    topText:
      "At Murrvy, fishing isn't just a business, it's our passion. Born from a love of the sea and the thrill of the catch, we specialize in designing and manufacturing premium fishing lures made for saltwater fishing in Indian waters.",
    middleText:
      'With years of hands-on experience and a deep understanding of marine fish behavior, we combine innovative designs, durable materials, and meticulous craftsmanship to create lures that deliver proven results. Every lure we produce is tested for performance in real conditions, ensuring it mimics natural movement and attracts game fish effectively.',
    bottomText:
      "Our mission is simple: to give saltwater anglers the confidence that they have the right lure for every adventure. Whether casting from the shore or heading offshore into deeper waters, fishing for us is more than just a sport, it's an experience and a connection to the ocean.",
  },
];

const AboutDetails = () => {
  const { blogdata } = useSelector((state) => state.BlogReducer);
  const DetailFilter = blogdata.filter((el) => el.type === 'blogDetails');
  const aboutDetailsData = DetailFilter.length > 0 ? DetailFilter : fallbackAboutDetails;

  return (
    <section className='masonary-blog-section'>
      <Container>
        <Row className='g-4'>
          <Col xl='9' md='8' className='order-md-1 ratio_square'>
            <Row className='g-4'>
              {aboutDetailsData.map((elem, i) => {
                return (
                  <Col xs='12' key={i}>
                    <div className='blog-details'>
                      <CenterImage elem={elem} />
                      <FormatDetails elem={elem} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <LeftSidebar />
        </Row>
      </Container>
    </section>
  );
};

export default AboutDetails;
