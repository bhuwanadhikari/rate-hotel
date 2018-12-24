import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
   <Route
      {...rest}
      render = {props =>
         auth.isAuthenticated === true?
            (<Component {...props} /> ):
            (<Redirect to='/login'/>)

   }

   />
);


PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(mapStateToProps)(PrivateRoute);
