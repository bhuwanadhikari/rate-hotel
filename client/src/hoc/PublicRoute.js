import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


const PublicRoute = ({component: Component, auth, ...rest }) => (
   <Route
      {...rest}
      render = {props => auth.isAuthenticated === false
         ?(<Component {...props}/>)
         :(<Redirect to="home"/>)
      }
   />
);


PublicRoute.propTypes = {
   auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(mapStateToProps)(PublicRoute);
