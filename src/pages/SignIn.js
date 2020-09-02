import React from 'react';
import { connect } from 'react-redux';
import ValidatedAuthForm from '../components/ValidatedAuthForm';

import { Link } from 'react-router-dom';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import {
  handleSignIn,
  handleSignInWithGoogle,
  handleSignInWithFacebook,
  handleAnonymousSignIn,
} from '../redux/actions/auth';

const SignIn = ({ isLoaded, token, error, apiCallInProgress, dispatch }) => {
  // const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (credentials) => {
    console.log('handleSubmit');
    await dispatch(handleSignIn(credentials.email, credentials.password));
  };

  return (
    <Container>
      <Jumbotron className='col-md-6 col-lg-6 col-sm-8 col-xs-10 offset-4 mx-auto jumbotron'>
        <Row className='justify-content-md-center'>
          <Col>
            <h2 className='text-center'>Sign In</h2>
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
              name='Sign In'
            />

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
                <Col>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                    alt='logo'
                  />
                </Col>
                {/* Google */}
              </Row>
            </Col>
            <Col className='col-md-4'>
              <Row
                className='text-center login-social btn btn-light col-md-12'
                onClick={() => dispatch(handleSignInWithFacebook())}
              >
                <Col>
                  <img
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F317727%2Ffacebook_social_social_media_icon&psig=AOvVaw0wlzJOu7oe3f-Q0wQrAEfU&ust=1599136137830000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIj72cC8yusCFQAAAAAdAAAAABAD'
                    alt='fb'
                  />
                </Col>
                {/* Facebook */}
              </Row>
            </Col>
            <Col className='col-md-4'>
              <Row
                className='text-center login-social btn btn-light col-md-12'
                onClick={() => dispatch(handleAnonymousSignIn())}
              >
                <Col>
                  {/* <img src='' alt='a' /> */}
                  Anonymous
                </Col>
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
