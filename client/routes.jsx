import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main,
  Login,
  Signup,
  UserHome,
  Home,
  AllAlbums,
  Cart,
  AboutUs,
  SingleAlbum,
  AdminOrders,
  AdminUsers,
} from './components';
import AdminEditProduct from './components/admineditproduct.jsx'
// import ProductListing from './components/productlisting'
import { me, fetchOrders, fetchProducts, fetchReviews } from './store';

/**
 * COMPONENT
 */

// QUESTION: Step #2. Persistant cart front end logic: The call to me() in user store starts here. Step 3 is in /store/user
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/allalbums" component={AllAlbums} />
            <Route path="/cart" component={Cart} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/album/:id" component={SingleAlbum} />
            <Route exact path="/" component={Home} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                {isAdmin && (
                <Switch><Route path="/admin/users" component={AdminUsers} />
                  <Route path="/admin/album/:id" component={AdminEditProduct} />
                  <Route path="/admin/orders" component={AdminOrders} />
                </Switch>
              )}
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
  isAdmin: !!state.user.id && state.user.isAdmin,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
