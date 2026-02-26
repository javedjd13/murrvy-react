import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import UserNav from './UserNav';
import BreadCrumb from '../BreadCrumb';
// import BreadCrumb from '../Elements/BreadCrumb';

const DashboardSidebar = () => {
  return (
    <Fragment>
      <BreadCrumb parent="User Dashboard" title="User Dashboard" />
      <section className='section-b-space'>
        <Container>
          <Row>
            <UserNav />
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default DashboardSidebar;
