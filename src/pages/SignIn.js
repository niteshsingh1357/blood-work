import React, { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';

import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Jumbotron } from 'react-bootstrap';

const SignIn = () => {
  const {
    handleSignIn,
    handleSignInWithGoogle,
    inputs,
    setInputs,
    error,
    handleAnonymousSignIn,
    handleSignInWithFacebook,
  } = useContext(firebaseAuth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    // wait to signUp
    await handleSignIn();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Jumbotron className='col-md-6 col-lg-4 col-sm-8 col-xs-10 jumbotron'>
      <Row className='justify-content-md-center'>
        <Col>
          <h1 className='text-center'>Sign In</h1>
        </Col>
      </Row>
      <Row className='justify-content-md-center formRow'>
        <Col xs='10' lg='10' md='12' sm='10'>
          {error !== null && (
            <div className='py-1 text-center mb-2 error'>{error}</div>
          )}
          <Form>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={inputs.email}
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
                value={inputs.password}
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
              onClick={(event) => handleSubmit(event)}
            >
              Sign In
            </Button>
            <div className='text-center py-2'>or</div>
            <Button
              variant='light'
              className='col-md-12 login-google'
              onClick={handleSignInWithGoogle}
              bsPrefix='btn'
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='logo'
              />
              Sign In with Google
            </Button>
            <br />
            <br />
            <Button
              variant='light'
              className='col-md-12 login-google'
              onClick={handleSignInWithFacebook}
              bsPrefix='btn'
            >
              Sign In with Facebook
            </Button>
            <br />
            <br />
            <Button
              variant='light'
              className='col-md-12 login-google'
              onClick={handleAnonymousSignIn}
              bsPrefix='btn'
            >
              Anonymous Sign In
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
    </Jumbotron>
  );
};
export default SignIn;
