import React, { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Jumbotron } from 'react-bootstrap';

const SignUp = (props) => {
  const { handleSignUp, inputs, setInputs, error } = useContext(firebaseAuth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    // wait to signUp
    await handleSignUp();
    // push home
    props.history.push('/');
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    // console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
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
            <div className='py-1 text-center mb-1 error'>
              {error}
            </div>
          )}
          <Form>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={inputs.email}
                id='userEmail'
                name='userEmail'
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
                name='userPassword'
                onChange={(event) => onChangeHandler(event)}
              />
            </Form.Group>
            <br />
            <Button
              variant='danger'
              type='submit'
              className='col-md-12 login'
              onClick={(event) => {
                handleSubmit(event);
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
  );
};
export default withRouter(SignUp);
