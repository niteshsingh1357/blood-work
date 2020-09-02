import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import { handleSignUp } from '../redux/actions/auth';
import { connect } from 'react-redux';
import ValidatedAuthForm from '../components/ValidatedAuthForm';

const SignUp = ({ isLoaded, token, error, apiCallInProgress, dispatch }) => {
  const handleSubmit = async (credentials) => {
    console.log('handleSubmit');
    await dispatch(handleSignUp(credentials.email, credentials.password));
    // push home
    // history.push('/');
    // if (apiCallInProgress === 0) setCredentials({ email: '', password: '' });
  };

  return (
    <Container>
      <Jumbotron className='col-md-6 col-lg-6 col-sm-8 col-xs-10 offset-4 mx-auto jumbotron'>
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
            <ValidatedAuthForm
              apiCallInProgress={apiCallInProgress}
              handleSubmit={handleSubmit}
              name='Sign Up'
            />
            <div className='text-center'>
              Already have an account?
              <Link to='/' className='link-text'>
                {' '}
                Login
              </Link>
            </div>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(SignUp);
