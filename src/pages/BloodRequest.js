import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import s from '../styles/Dashboard.module.scss';

export default function BloodRequest() {
  return (
    <div>
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Requests</BreadcrumbItem>
        </Breadcrumb>
        <h1 className='mb-lg'>Requests</h1>
      </div>
    </div>
  );
}
