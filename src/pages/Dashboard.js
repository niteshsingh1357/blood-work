import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';

import s from '../styles/Dashboard.module.scss';

export default function Dashboard() {
  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>
      <h1 className='mb-lg'>Dashboard</h1>
      <Row className='content'>
        <Col sm={12} md={6}></Col>
      </Row>
    </div>
  );
}
