import React, {Component} from 'react';

import Button from '../../components/ui/Button/Button';
import loginIcon from '../../img/navImg/login-solid.svg';
import './Login.css';
import Modal from '../../components/ui/AlertRegModal/AlertRegistration';
import InputField from '../../components/ui/InputField/InputField';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { releaseHotelId } from '../../redux/actions/hotelActions';

import {NavLink} from 'react-router-dom';

// import {removeErrFeedback} from '../../components/common/functions';

class Login extends Component{
   constructor(){
      super();
      this.state = {
         email: '',
         password: '',
         errors: {}
      }
   }

   onChangeHandler = (e) => {
      this.setState({[e.target.name] : e.target.value});

      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   onLoginHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const userData = {
         email: this.state.email,
         password: this.state.password
      };
      this.props.loginUser(userData);
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated) {

            this.props.history.push('/home');

      }
      if(nextProps.errors){
         this.setState({errors: nextProps.errors});
      }

   }


   render(){
      return (
         <div className= "FormBox">
            <Modal/>
            <img className="LoginIcon" src={loginIcon} alt="Log In Icon for the CrowApp"/>

            <form className="Form" noValidate>

               <InputField
                  className="Input"
                  type="email"
                  placeholder = "Email"
                  changed = {this.onChangeHandler}
                  name = "email"
                  value = {this.state.email}
                  errors = {this.state.errors}
               />
               <InputField
                  className="Input"
                  type="password"
                  placeholder = "Password"
                  changed = {this.onChangeHandler}
                  name = "password"
                  value = {this.state.password}
                  errors = {this.state.errors}
               />
            </form>

            <Button cls = "Success" clicked={this.onLoginHandler} >Log In</Button>

            <div className="InfoBar">
               <NavLink to={'/sign-up'}>Sign Up! If you are new to CrowApp</NavLink>
            </div>

         </div>
      )
   }
}

Login.propTypes = {
   loginUser : PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
   hotel: PropTypes.object.isRequired,
   releaseHotelId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors,
   hotel: state.hotel
});

export default connect(mapStateToProps, { loginUser, releaseHotelId })(Login);
