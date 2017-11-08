import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from 'semantic-ui-react';
import { userUpdateUser } from '../store/users';

const PasswordReset = (props) => {
  const { user, state, updatePassword } = props;
  return (

    <div className="login-form">
      <Grid
        textAlign="center"
        style={{ height: '450px' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            Please Create A New Password
          </Header>
          <Form
            onSubmit={evt => updatePassword(evt, user.id, user)}
            size="large"
          >
            <Segment stacked style={{ height: '225px' }}>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="pass"
              />
            
                  <Button color="green" fluid size="large">
                Reset Password
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapState = (state) => {
  const { user } = state;
  return {
    user,
    state,
  };
};

const mapDispatch = dispatch => ({
  updatePassword(evt, userId, user) {
    const newPass = evt.target.pass.value
    console.log(newPass)
    const updatedPass = Object.assign(
      {},
      user,
      { password: newPass, oldPassword: false },
    );
    console.log(updatedPass)
    dispatch(userUpdateUser(userId, updatedPass));
  },
});

export default connect(mapState, mapDispatch)(PasswordReset);
