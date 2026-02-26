import { Col } from 'reactstrap';
import { Address, Email, phone, VoxoMail, mobileno, ActualAddress, CommonPath } from '../../../constant/index';
import murrvy from "../../../assets/images/murrvy-logo.png";

const ContactFooter = () => {
  return (
    <>
      <Col xl='3' lg='3' md='6'>
        <div className='footer-contact'>
          <div className='brand-logo'>
            <a href='#javascript' className='footer-logo'>
              <img width={68} height={25} src={murrvy} className='img-fluid no-dark-invert' alt='logo' />
            </a>
          </div>
          <ul className='contact-lists'>
            <li>
              <span>
                <b>{phone}:</b>
                <span className='font-light'>{mobileno}</span>
              </span>
            </li>
            <li>
              <span>
                <b>{Address}:</b>
                <span className='font-light'> {ActualAddress}</span>
              </span>
            </li>
            <li>
              <span>
                <b>{Email}:</b>
                <span className='font-light'> {VoxoMail}</span>
              </span>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};
export default ContactFooter;
