import React, {Component} from 'react';

import Button from '../../components/ui/button/Button';
import loginIcon from '../../img/navImg/login-solid.svg';
import './Login.css';
import Modal from '../../components/ui/AlertRegModal/AlertRegistration';

import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

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
      this.setState({[e.target.name] : e.target.value})
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

               <input
                  className="Input"
                  type="email"
                  placeholder = "Email"
                  onChange = {this.onChangeHandler}
                  name = "email"
                  value = {this.state.email}
               />

               {this.state.errors.email? (<div className="errorFeedback">{this.state.errors.email}</div>):null}

               <input
                  className="Input"
                  type="password"
                  placeholder = "Password"
                  onChange = {this.onChangeHandler}
                  name = "password"
                  value = {this.state.password}
               />
               {this.state.errors.password? (<div className="errorFeedback">{this.state.errors.password}</div>):null}

            </form>

            <Button cls = "Success" clicked={this.onLoginHandler} >Log In</Button>

         </div>
      )
   }
}

Login.propTypes = {
  loginUser : propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
