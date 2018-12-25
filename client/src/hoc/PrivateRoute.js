import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Landing from '../components/Landing/Landing';
import Login from '../containers/Login/Login';
import SignUp from '../containers/SignUp/SignUp';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
   <Route
      {...rest}
      render = {props => {
         if(Component === Login ||
            Component === SignUp ||
            Component === Landing
         ){
            return auth.isAuthenticated === true?
               (<Redirect to='/home'/>) :
               (<Component {...props}/>);
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
