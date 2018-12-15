import React, {Component} from 'react';

import Button from '../../components/ui/button/Button';
import userIcon from '../../img/navImg/user-plus-solid.svg';
import './SignUp.css';

class SignUp extends Component{
      state = {
         userData: {
            name:'',
            email:'',
            password: '',
            password2: '',
            faculty: ''

         }
      };

   render(){
      return (
         <div className= "FormBox">
               <img className="UserIcon" src={userIcon} alt=""/>
            <form className="Form" noValidate>
               <input className="Input" type="text" placeholder = "Full Name"/>
               <input className="Input" type="email" placeholder = "Email"/>
               <input className="Input" type="password" placeholder = "Password"/>
               <input className="Input" type="password" placeholder = "Confirm Password"/>
               <input className="Input" type="text" placeholder = "Faculty"/>
            </form>
              <Button cls = "Success" value = "Sign Up" />

         </div>
      )
   }
}

export default SignUp;