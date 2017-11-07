import React from 'react'
import {
  Button,
  Container,
  Menu,
  Icon,
  Segment,
  Divider,
  Dropdown,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../store/user'


const Navigation = (props) => {
  const {
    handleClick, isLoggedIn, LogOut, isAdmin,
  } = props

  return (

    <Segment
      inverted
      textAlign="center"
      style={{ padding: '0em 0em' }}
      vertical
    >
      <Container>
        <Menu inverted pointing secondary size="large">
          <Menu.Item as={Link} to="/"><Icon name="home" />Home</Menu.Item>
          <Menu.Item as={Link} to="/allalbums">All Albums</Menu.Item>
          <Menu.Item as={Link} to="/aboutus">About Us</Menu.Item>
          {

          isLoggedIn
          ?
            <Menu.Item position="right">
              {/* The navbar will show these links after you log in */}
              {
                isAdmin &&
                <Menu inverted vertical>
                  <Dropdown item inverted text="Admin Controls">
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/admin/users">User Management</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/products">Product Management</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/orders">Order Management</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>

              }
              <Button inverted as={Link} onClick={handleClick} to="/login">Log Out</Button>
              <Button inverted as={Link} to="/cart" style={{ marginLeft: '0.5em' }}><Icon name="cart" />Cart</Button>

              <Button inverted as={Link} to="/home" style={{ marginLeft: '0.5em' }}><Icon name="user circle outline" />Profile</Button>
           
            </Menu.Item>
          :
            <Menu.Item position="right">
              {/* The navbar will show these links before you log in */}
              <Button inverted as={Link} to="/login">Log In</Button>
              <Button inverted as={Link} to="/signup" style={{ marginLeft: '0.5em' }}>Sign Up</Button>
              <Button inverted as={Link} to="/cart" style={{ marginLeft: '0.5em' }}><Icon name="cart" />Cart</Button>
            </Menu.Item>
            }
        </Menu>
      </Container>
      <Divider inverted />
    </Segment>
  )
}


const mapState = state => ({
  isLoggedIn: !!state.user.id,
  isAdmin: !!state.user.id && state.user.isAdmin,
})

const mapDispatch = dispatch => ({
  handleClick: () => {
    console.log('You signed out!');
    dispatch(logout())
    // browserHistory.push('/');
  },
});

export default connect(mapState, mapDispatch)(Navigation);
/**
 * PROP TYPES
 */
Navigation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
