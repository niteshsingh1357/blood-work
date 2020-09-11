import React, { useEffect } from 'react';
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
import DatePicker from 'react-datepicker';
import Geolocation from '../components/Geolocation';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerField from '../components/DatePicker';
import DebugForm from '../components/DebugForm';
import firebase from 'firebase';

export default function Profile() {
  const initialValues = {
    name: 'Nitesh Singh',
    email: 'niteshsingh1357@gmail.com',
    current_address: 'Brt-10, Nepal',
    permanent_address: 'Brt-10, Nepal',
    age: 0,
    weight: 0,
    blood_group: 'AB+',
    last_donated_date: null,
    is_donor: true,
    primary_phone_number: '9842580134',
    secondary_phone_number: '',
  };

  const buildRequiredForHasDonated = (requiredText) => ({
    is: true,
    then: Yup.date().required(requiredText),
  });

  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  // Form validation with Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required Field'),
    email: Yup.string().email('Enter a valid email').required('Required Field'),
    current_address: Yup.string().required('Required Field'),
    permanent_address: Yup.string().required('Required Field'),
    blood_group: Yup.string()
      .required('Select Your Blood Group')
      .oneOf(
        ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
        'Select Your Blood Group',
      ),
    age: Yup.number().required('Required Field').max(100, 'Enter a valid age').nullable().min(1, 'Enter valid age'),
    weight: Yup.number().required('Required Field').nullable().min(5, 'Enter valid weight'),

    is_donor: Yup.boolean(),
    last_donated_date: Yup.date()
      .nullable()
      .when(
        'has_donated',
        buildRequiredForHasDonated('Select your last donation date'),
      ),
    primary_phone_number: Yup.string()
      .matches(phoneRegExp, 'Enter a valid Phone number')
      .min(10, 'Not valid')
      .max(10, 'Not valid')
      .required('Rquired Field'),
    secondary_phone_number: Yup.string()
      .matches(phoneRegExp, 'Enter a valid Phone number')
      .min(10, 'Not valid')
      .max(10, 'Not valid'),
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);

    // firestore
    const db = firebase.firestore();
    const userProfileRef = await db.collection('userProfile').add(values);
    console.log(userProfileRef);
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Profile</BreadcrumbItem>
      </Breadcrumb>
      <h1 className='mb-lg'>Create Profile</h1>
      <Row>
        <Col sm={8} lg={8} md={8}>
          <Widget
            // className='p-5'
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
                // setSubmitting(true);
                handleSubmit(values);
                // setTimeout(() => {
                //   setSubmitting(false);
                // }, 2000);
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
                setFieldValue,
                setFieldTouched,
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='input-name'>
                      Name<span className='text-danger'>*</span>
                    </Label>
                    <Input
                      bsSize='lg'
                      type='text'
                      name='name'
                      id='input-name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.name && touched.name ? true : false}
                    />
                    {errors.name && touched.name && (
                      <div className='input-feedback'>{errors.name}</div>
                    )}
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for='input-age'>
                          Age<span className='text-danger'>*</span>
                        </Label>
                        <Input
                          type='number'
                          name='age'
                          id='age'
                          value={values.age}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={errors.age && touched.age ? true : false}
                        />
                        {errors.age && touched.age && (
                          <div className='input-feedback'>{errors.age}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for='BloodGroup'>
                          Weight (in Kg)<span className='text-danger'>*</span>{' '}
                        </Label>
                        <Input
                          type='number'
                          name='weight'
                          id='weight'
                          value={values.weight}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            errors.weight && touched.weight ? true : false
                          }
                        />
                        {errors.weight && touched.weight && (
                          <div className='input-feedback'>{errors.weight}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for='BloodGroup'>
                      Blood Group<span className='text-danger'>*</span>
                    </Label>
                    <Input
                      type='select'
                      name='blood_group'
                      placeholder='Select Blood Group...'
                      id='bloodGroup'
                      value={values.blood_group}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        errors.blood_group && touched.blood_group ? true : false
                      }
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

                  <FormGroup>
                    <Label for='input-address'>
                      Email Address<span className='text-danger'>*</span>
                    </Label>
                    <Input
                      invalid={errors.email && touched.email ? true : false}
                      // bsSize='lg'
                      type='email'
                      name='email'
                      id='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className='input-feedback'>{errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='input-address'>
                      Permanent Address<span className='text-danger'>*</span>
                    </Label>
                    <Input
                      invalid={
                        errors.permanent_address && touched.permanent_address
                          ? true
                          : false
                      }
                      // bsSize='lg'
                      type='address'
                      name='permanent_address'
                      id='permanent_address'
                      value={values.permanent_address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.permanent_address && touched.permanent_address && (
                      <div className='input-feedback'>
                        {errors.permanent_address}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for='input-address'>
                      Current Address<span className='text-danger'>*</span>
                    </Label>
                    <Input
                      invalid={
                        errors.current_address && touched.current_address
                          ? true
                          : false
                      }
                      // bsSize='lg'
                      type='address'
                      name='current_address'
                      id='current_address'
                      value={values.current_address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.current_address && touched.current_address && (
                      <div className='input-feedback'>
                        {errors.current_address}
                      </div>
                    )}
                  </FormGroup>
                  <Row>
                    <Col sm={12} md={6} lg={6}>
                      <FormGroup>
                        <Label for='input-number'>
                          Primary Phone Number
                          <span className='text-danger'>*</span>
                        </Label>
                        <Input
                          type='text'
                          name='primary_phone_number'
                          id='primary_phone_number'
                          value={values.primary_phone_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            errors.primary_phone_number &&
                            touched.primary_phone_number
                              ? true
                              : false
                          }
                        />
                        {errors.primary_phone_number &&
                          touched.primary_phone_number && (
                            <div className='input-feedback'>
                              {errors.primary_phone_number}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <FormGroup>
                        <Label for='input-number'>
                          Secondary Phone Number (Optional)
                        </Label>
                        <Input
                          type='text'
                          name='secondary_phone_number'
                          id='secondary_phone_number'
                          value={values.secondary_phone_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            errors.secondary_phone_number &&
                            touched.secondary_phone_number
                              ? true
                              : false
                          }
                        />
                        {errors.secondary_phone_number &&
                          touched.secondary_phone_number && (
                            <div className='input-feedback'>
                              {errors.secondary_phone_number}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <DatePickerField
                    id='last_donated_date'
                    name='last_donated_date'
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    errors={errors}
                    touched={touched.last_donated_date}
                  />

                  <div className={'justify-content-center'}>
                    <FormGroup check>
                      <Input
                        type='checkbox'
                        name='is_donate'
                        id='is_donate'
                        checked={values.is_donor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Label for='exampleCheck' check>
                        <span className='justify-content-center'>
                          &nbsp; <b> I Would like to be a blood donor.</b>
                        </span>
                      </Label>
                    </FormGroup>
                  </div>

                  <br />
                  <br />
                  <div className='d-flex justify-content-between align-items-center'>
                    <ButtonGroup className='pull-right'>
                      <Button
                        onClick={() => resetForm(initialValues)}
                        className='ml-sm'
                        color='default'
                      >
                        Clear
                      </Button>
                      <Button
                        color='danger'
                        disabled={isSubmitting}
                        type='submit'
                      >
                        Create
                      </Button>
                    </ButtonGroup>
                  </div>

                  {/* <DebugForm
                    values={values}
                    errors={errors}
                    touched={touched}
                  /> */}
                </Form>
              )}
            </Formik>
          </Widget>
        </Col>
      </Row>
    </div>
  );
}
