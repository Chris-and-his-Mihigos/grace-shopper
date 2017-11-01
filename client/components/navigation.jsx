import React from 'react'
import {
  Button,
  Container,
  Menu,
  Icon,
  Segment,
  Divider,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navigation = (props) => {
  const { handleClick, isLoggedIn } = props

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
          <Menu.Item as={Link} to="/contact">Contact</Menu.Item>
          {
          isLoggedIn
          ?
            <Menu.Item position="right">
              {/* The navbar will show these links after you log in */}
              <Button inverted as={Link} onClick={handleClick} to="/">Log Out</Button>
              <Button inverted as={Link} to="/cart"><Icon name="cart" />Cart</Button>
            </Menu.Item>
          :
            <Menu.Item position="right">
              {/* The navbar will show these links before you log in */}
              <Button inverted as={Link} to="/login">Log In</Button>
              <Button inverted as={Link} to="/signup" style={{ marginLeft: '0.5em' }}>Sign Up</Button>
              <Button inverted as={Link} to="/cart"><Icon name="cart" />Cart</Button>
            </Menu.Item>
            }
        </Menu>
      </Container>
      <Divider inverted />
    </Segment>
  )
}

export default Navigation

/**
 * PROP TYPES
 */
Navigation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
