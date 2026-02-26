import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Facebook, Google, Notamember, Orsigninwith, Signupnow } from '@/Constant';
import facebook from '../../assets/images/inner-page/facebook.png';
import google from '../../assets/images/inner-page/google.png';
const AddAccountLink = () => {
  return (
    <>
      <p className='sign-category'>
        <span>{Orsigninwith}</span>
      </p>
      <Row className='gx-md-3 gy-3'>
        <Col md='6'>
          <Link href={'https://www.facebook.com/'}>
            <div className='social-media fb-media'>
              <img src={facebook} className='img-fluid' alt='facebook' />
              <h6>{Facebook}</h6>

            </div>
          </Link>
        </Col>
        <Col md='6'>
          <a href='https://www.google.co.in/'>
            <div className='social-media google-media'>
              <img src={google} className='img-fluid' alt='google' />
              <h6>{Google}</h6>
            </div>
          </a>
        </Col>
      </Row>
      <p>
        {Notamember}
        <Link to='/register' className='theme-color ps-1'>
          {Signupnow}
        </Link>
      </p>
    </>
  );
};
export default AddAccountLink;
