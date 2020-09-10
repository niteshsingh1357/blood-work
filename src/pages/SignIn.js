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

import '../styles/auth.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

library.add(fab, faUserSecret);

const SignIn = ({ isLoaded, token, error, apiCallInProgress, dispatch }) => {
  // const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (credentials) => {
    console.log('handleSubmit');
    await dispatch(handleSignIn(credentials.email, credentials.password));
  };

  return (
    <Container>
      {/* <div id='progressBarContainer'></div> */}
      <Jumbotron
        className={
          'col-md-8 col-lg-6 col-sm-8 col-xs-10 offset-4 mx-auto jumbotron'
        }
      >
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
            <OverlayTrigger placement='top' overlay={<Tooltip>Google</Tooltip>}>
              <Col
                background='red'
                className='col-md-3 col-lg-3 col-sm-10 mx-1 my-1 text-center login-social btn btn-light google'
                onClick={() => dispatch(handleSignInWithGoogle())}
              >
                <FontAwesomeIcon
                  size='lg'
                  color='white'
                  icon={['fab', 'google']}
                />
              </Col>
            </OverlayTrigger>

            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>Facebook</Tooltip>}
            >
              <Col
                className='col-md-3 col-lg-3 col-sm-10 mx-1 my-1 text-center login-social btn btn-light facebook'
                onClick={() => dispatch(handleSignInWithFacebook())}
              >
                <FontAwesomeIcon
                  color='white'
                  size='lg'
                  icon={['fab', 'facebook-f']}
                />
                {/* <FontAwesomeIcon icon='fa-facebook-square' /> */}
              </Col>
            </OverlayTrigger>

            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>Anonymous</Tooltip>}
            >
              <Col
                className='col-md-3 col-lg-3 col-sm-10 my-1 mx-1 text-center login-social btn btn-light anonymous'
                onClick={() => dispatch(handleAnonymousSignIn())}
              >
                <FontAwesomeIcon color='white' size='lg' icon='user-secret' />
              </Col>
            </OverlayTrigger>
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
