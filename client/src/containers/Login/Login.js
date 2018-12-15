import React, {Component} from 'react';

import Button from '../../components/ui/button/Button';
import loginIcon from '../../img/navImg/login-solid.svg';
import './Login.css';

class Login extends Component{
   state = {

   };

   render(){
      return (
         <div className= "FormBox">
            <img className="LoginIcon" src={loginIcon} alt=""/>
            <form className="Form" >
               <input className="Input" type="email" placeholder = "Email"/>
               <input className="Input" type="password" placeholder = "Password"/>
            </form>
            <Button cls = "Success" value = "Log In" />

         </div>
      )
   }
}

export default Login;
