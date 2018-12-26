import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const fakeAuth = {
  Up: true
};

const PrivateRoute = ({component: Component, auth, ...rest}) => (
   <Route
      {...rest}
      render ={props => (auth.isAuthenticated === true) && (fakeAuth.Up === true) //fake auth check
         ? (<Component {...props} />)
         : (<Redirect to='/home'/>)
      }
   />
);


PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(mapStateToProps)(PrivateRoute);
