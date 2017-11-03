import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {
    name, displayName, handleSubmit, error,
  } = props;

  return (
    <div className="login-form">
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            {displayName}
          </Header>
          <Form onSubmit={handleSubmit} name={name} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="text"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button color="green" fluid size="large">
                {displayName}
              </Button>
            </Segment>
          </Form>
          <Message>
            {displayName} with <a href="/auth/google">Google</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = (dispatch) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName));
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
