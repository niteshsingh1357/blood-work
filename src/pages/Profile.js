import React from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import s from '../styles/Profile.module.scss';
import Widget from '../components/Widget';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function Profile() {
  const initialValues = {
    name: 'Nitesh',
    address: 'Brt',
    age: 27,
    blood_group: 'AB+',
    // last_donated_date: Date,
    // has_donated: false,
    // register_as_donor: false,
  };

  // Form validation with Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required Field'),
    address: Yup.string().required('Required Field'),
    blood_group: Yup.string().required('Required Field'),
    age: Yup.number('Enter a number').required('Required Field'),
  });

  const handleSubmit = (values) => {
    console.log(values)
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Profile</BreadcrumbItem>
      </Breadcrumb>
      <h1 className='mb-lg'>Create Profile</h1>
      <Row>
        <Col sm={6}>
          <Widget
            title={
              <h5>
                Create Profile <span className='fw-semi-bold'>Form</span>
              </h5>
            }
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('values', values);
                setSubmitting(true);
                handleSubmit(values);
              }}
            >
              {({
                errors,
                touched,
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='input-name'>Name</Label>
                    <Input
                      bsSize='lg'
                      type='text'
                      name='name'
                      id='input-name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name && 'error'}
                    />
                    {errors.name && touched.name && (
                      <div className='input-feedback'>{errors.name}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='input-name'>Address</Label>
                    <Input
                      bsSize='lg'
                      type='text'
                      name='address'
                      id='address'
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.address && touched.address && 'error'}
                    />
                    {errors.address && touched.address && (
                      <div className='input-feedback'>{errors.address}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='input-name'>Age</Label>
                    <Input
                      bsSize='lg'
                      type='number'
                      name='age'
                      id='age'
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.age && touched.age && 'error'}
                    />
                    {errors.age && touched.age && (
                      <div className='input-feedback'>{errors.age}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='BloodGroup'>Blood Group</Label>
                    <Input
                      type='select'
                      name='bloodGroup'
                      id='bloodGroup'
                      value={values.blood_group}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.blood_group && touched.blood_group && 'error'}
                    >
                      <option>Select Blood Group...</option>
                      <option>A+</option>
                      <option>B+</option>
                      <option>AB+</option>
                      <option>O+</option>
                      <option>A-</option>
                      <option>B-</option>
                      <option>AB-</option>
                      <option>O-</option>
                    </Input>
                    {errors.blood_group && touched.blood_group && (
                      <div className='input-feedback'>{errors.blood_group}</div>
                    )}
                  </FormGroup>

                  <div>{JSON.stringify(values)}</div>

                  <div className='d-flex justify-content-between align-items-center'>
                    {/* <div className='d-flex'>
                  <div className='abc-checkbox'>
                    <Input id='input-checkbox' type='checkbox' />
                    <Label for='input-checkbox' />
                  </div>
                  <span>Remember me</span>
                </div> */}
                    <ButtonGroup className='pull-right'>
                      <Button className='ml-sm' color='default'>
                        Cancel
                      </Button>
                      <Button color='danger' disabled={isSubmitting} type='submit'>
                        Create
                      </Button>
                    </ButtonGroup>
                  </div>
                </Form>
              )}
            </Formik>
          </Widget>
        </Col>
      </Row>
    </div>
  );
}
