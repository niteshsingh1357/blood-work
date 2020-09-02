import React from 'react';
import Spinner from './Spinner';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Button, Form } from 'react-bootstrap';

// Form validation with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required Field'),
  password: Yup.string()
    .required('Required Field')
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
});

const ValidatedAuthForm = ({ apiCallInProgress, handleSubmit, name }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log('values', values);
      setSubmitting(false);
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
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='e.g, john@example.com'
            value={values.email}
            id='email'
            name='email'
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && 'error'}
          />
          {errors.email && touched.email && (
            <div className='input-feedback'>{errors.email}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>

          <Form.Control
            type='password'
            value={values.password}
            id='password'
            name='password'
            placeholder='e.g, example123'
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && 'error'}
          />
          <Form.Text id='passwordHelpBlock' muted>
            Must have atleast 8 characters and a number
          </Form.Text>
          {errors.password && touched.password && (
            <div className='input-feedback'>{errors.password}</div>
          )}
        </Form.Group>
        <br />
        <Button
          variant='danger'
          type='submit'
          disabled={isSubmitting}
          className='col-md-12 login'
        >
          {apiCallInProgress === 1 ? <Spinner /> : <span>{name}</span>}
        </Button>

        <br />
        <br />
      </Form>
    )}
  </Formik>
);

export default ValidatedAuthForm;
