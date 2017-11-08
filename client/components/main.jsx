import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import Navigation from './navigation.jsx'
import Footer from './footer.jsx'
import ErrorModal from './error.jsx';
import PasswordReset from './passwordreset.jsx'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, error, user } = props

  return (
    <div>
      <Navigation />
      {error !== null ? <ErrorModal error={error} /> : <div />}
      {user.oldPassword ? <PasswordReset /> : <div /> }
      {children}
      <Footer />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  error: state.error,
  user: state.user,
})

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  },
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */

