import React, { useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Jumbotron, Container } from 'react-bootstrap';
import {
  handleSignIn,
  handleSignInWithGoogle,
  handleSignInWithFacebook,
  handleAnonymousSignIn,
} from '../redux/actions/auth';

const SignIn = ({ isLoaded, token, error, apiCallInProgress, dispatch }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Form validation with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(7, 'Password is too short - should be 8 chars minimum.'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    const valid = await validationSchema.isValid(credentials);
    console.log(valid);
    // wait to signUp
    // if (valid)
    //   await dispatch(handleSignIn(credentials.email, credentials.password));
  };

  const onChangeHandler = (e) => {
    e.persist();
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <Jumbotron className='col-md-6 col-lg-4 col-sm-8 col-xs-10 jumbotron my-auto mx-auto'>
        <Row className='justify-content-md-center'>
          <Col>
            <h1 className='text-center'>Sign In</h1>
          </Col>
        </Row>
        <Row className='justify-content-md-center formRow'>
          <Col xs='10' lg='10' md='12' sm='10'>
            {error !== null && (
              <div className='py-1 text-center mb-1 error'>{error}</div>
            )}
            <Form>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={credentials.email}
                  id='userEmail'
                  name='email'
                  onChange={(event) => onChangeHandler(event)}
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid emmail.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={credentials.password}
                  id='userPassword'
                  name='password'
                  onChange={(event) => onChangeHandler(event)}
                />
                <Form.Text id='passwordHelpBlock' muted>
                  Must be minimum 8 characters long.
                </Form.Text>
              </Form.Group>
              <br />
              <Button
                variant='danger'
                type='submit'
                className='col-md-12 login'
                onClick={handleSubmit}
              >
                {apiCallInProgress === 1 ? <Spinner /> : <span>Sign Up</span>}
              </Button>

              <br />
              <br />

              <div className='text-center'>
                Don't have an account?
                <Link to='signUp' className='link-text'>
                  {' '}
                  Sign Up
                </Link>
              </div>
              <div className='text-center link-text'>
                <Link to='/' className='link-text'>
                  Forgot Password?
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
        <div className='mt-2'>
          <div className='text-center py-2'>
            <b>Sign In with</b>
          </div>
          <Row className='social justify-content-center text-center'>
            <Col className='col-md-4 col-lg-4 col-4'>
              <Row
                className='text-center login-social btn btn-light col-md-12 col-lg-12 col-sm-12'
                onClick={() => dispatch(handleSignInWithGoogle())}
              >
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='logo'
                />
                {/* Google */}
              </Row>
            </Col>
            <Col className='col-md-4'>
              <Row
                className='text-center login-social btn btn-light col-md-12'
                onClick={() => dispatch(handleSignInWithFacebook())}
              >
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_Logo_Mini.svg'
                  alt='logo'
                />
                {/* Facebook */}
              </Row>
            </Col>
            <Col className='col-md-4'>
              <Row
                className='text-center login-social btn btn-light col-md-12'
                onClick={() => dispatch(handleAnonymousSignIn())}
              >
                {/* <img src='' alt='a' /> */}
                Anonymous
              </Row>
            </Col>
          </Row>
        </div>
      </Jumbotron>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { token, error } = state.authReducer.signUp;
  const { apiCallInProgress } = state.authReducer.apiCallStatus;
  const { isLoaded } = state.firebaseReducer.auth;
  return { token, error, apiCallInProgress, isLoaded };
};

export default connect(mapStateToProps)(SignIn);
