import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Jumbotron } from 'react-bootstrap';
import { handleSignUp } from '../redux/actions/auth';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';

const SignUp = ({ isLoaded, token, error, apiCallInProgress, dispatch }) => {
  console.log('props', token, error, apiCallInProgress);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    // const { dispatch } = props;
    event.preventDefault();
    console.log('handleSubmit');
    // wait to signUp
    await dispatch(handleSignUp(credentials.email, credentials.password));
    // push home
    // history.push('/');
    if (apiCallInProgress === 0) setCredentials({ email: '', password: '' });
  };

  const onChangeHandler = (e) => {
    e.persist();
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Jumbotron className='col-md-6 col-lg-4 col-sm-8 col-xs-10 jumbotron'>
      <Row className='justify-content-md-center'>
        <Col>
          <h1 className='text-center'>SIGN UP</h1>
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
              Already have an account?
              <Link to='/' className='link-text'>
                {' '}
                Login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Jumbotron>
  );
};

const mapStateToProps = (state) => {
  const { token, error } = state.authReducer.signUp;
  const { apiCallInProgress } = state.authReducer.apiCallStatus;
  const { isLoaded } = state.firebaseReducer.auth;
  return { token, error, apiCallInProgress, isLoaded };
};

export default connect(mapStateToProps)(SignUp);
