import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types'

const ProtectedRoute = ({component: Component, auth, ...rest}) => (
   <Route
      {...rest}
      render = {props => auth.isAuthenticated?
         (<Component {...props} />) :
         (<Redirect to='/login' />)
      }
   />
);

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});


export default connect(mapStateToProps)(ProtectedRoute);
