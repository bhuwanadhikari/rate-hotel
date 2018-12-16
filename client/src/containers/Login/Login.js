import React, {Component} from 'react';

import Button from '../../components/ui/button/Button';
import loginIcon from '../../img/navImg/login-solid.svg';
import './Login.css';

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

   onClickHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const user = {
         email: this.state.email,
         password: this.state.password
      };
      console.log(user);
   };

   render(){
      return (
         <div className= "FormBox">
            <img className="LoginIcon" src={loginIcon} alt="Log In Icon for the CrowApp"/>

            <form className="Form" >

               <input
                  className="Input"
                  type="email"
                  placeholder = "Email"
                  onChange = {this.onChangeHandler}
                  name = "email"
                  value = {this.state.email}

               />
               <input
                  className="Input"
                  type="password"
                  placeholder = "Password"
                  onChange = {this.onChangeHandler}
                  name = "password"
                  value = {this.state.password}

               />

            </form>

            <Button cls = "Success" value = "Log In" clicked={this.onClickHandler} />

         </div>
      )
   }
}

export default Login;
