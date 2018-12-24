import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Landing from '../components/Landing/Landing';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
   <Route
      {...rest}
      render = {props => {
         console.log(Component);
         if(Component === Landing){
            return auth.isAuthenticated === true ?
               (<Redirect to='/home'/>) :
               (<Component {...props} />);
         }
         return auth.isAuthenticated === true ?
            (<Component {...props} />) :
            (<Redirect to='/login'/>);
      }

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
