// import { CommonPath, FooterDespp, GotQustion, mobileno } from '../../../constant/index';
import { Col } from 'reactstrap';
import headphone from "../../../assets/images/shoes/other/headphone.png"
import { FooterDespp, GotQustion, mobileno } from '@/Constant';
const QuestionTabs = () => {
  return (
    <Col xl='3' lg='4' sm='6' className='d-none d-sm-block'>
      <div className='footer-newsletter'>
        <h3 className='fs-5'>{GotQustion}</h3>
        <div className='footer-number'>
          <div className='footer-number-image'>
            <img width={20} height={20} src={headphone} className='img-fluid' alt='headphone' />
          </div>

          <div className='footer-number-container'>
            <h3 className='fs-4'>{mobileno}</h3>
          </div>
        </div>

        <div className='footer-details'>
          <p className='font-light'>{FooterDespp}</p>
        </div>
      </div>
    </Col>
  );
};
export default QuestionTabs;