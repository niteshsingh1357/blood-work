import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Jumbotron } from 'react-bootstrap';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    // setDisplayName('');
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
    // else if (name === 'displayName') {
    //   setDisplayName(value);
    // }
  };
  return (
    // <Router>
    <Jumbotron className='col-md-6 offset-md-3 mt-5 col-xs-9 jumbotron'>
      <Row className='justify-content-md-center'>
        <Col>
          <h1 className='text-center'>SIGN UP</h1>
        </Col>
      </Row>
      <Row className='justify-content-md-center formRow'>
        <Col xs='10' lg='10' md='12' sm='10'>
          {error !== null && (
            <div className='py-4 bg-red-600 w-full text-white text-center mb-3'>
              {error}
            </div>
          )}
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                id='userEmail'
                name='userEmail'
                onChange={(event) => onChangeHandler(event)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                id='userPassword'
                name='userPassword'
                onChange={(event) => onChangeHandler(event)}
              />
            </Form.Group>
            <br />
            <Button
              variant='primary'
              type='submit'
              className='col-md-12 login'
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign Up
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
    // {/* </Router> */}
  );
};
export default SignUp;
