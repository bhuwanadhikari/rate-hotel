import React, {Component} from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../redux/actions/authActions';

import Button from '../../components/ui/button/Button';
import userIcon from '../../img/navImg/user-plus-solid.svg';
import './SignUp.css';

class SignUp extends Component{
   constructor(){
      super();
      this.state = {
         name:'',
         email:'',
         password: '',
         password2: '',
         faculty: '',
         errors: {}
      }
   };

   onChangeHandler = (e) => {
      this.setState({[e.target.name] : e.target.value});

      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.errors){
         this.setState({errors: nextProps.errors});
      }
   }

   onClickHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const newUser =  {
         name: this.state.name,
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2,
         faculty: this.state.faculty,
      };

      this.props.registerUser(newUser, this.props.history);

   };


   render(){
      return (
         <div className= "FormBox" id = "signUpForm">
            <img className="UserIcon" src={userIcon} alt="Sign Up Icon for CrowApp"/>
            <form className="Form" noValidate>

               <input
                  className="Input"
                  value = {this.state.name}
                  type="text"
                  placeholder = "Full Name"
                  name = "name"
                  onChange={this.onChangeHandler}
               />
               {this.state.errors.name? (<div className="errorFeedback">{this.state.errors.name}</div>):null      }
               <input
                  className="Input"
                  value = {this.state.email}
                  type="email"
                  placeholder = "Email"
                  name = "email"
                  onChange={this.onChangeHandler}
               />
               {this.state.errors.email? (<div className="errorFeedback">{this.state.errors.email}</div>):null      }
               <input
                  className="Input"
                  value = {this.state.password}
                  type="password"
                  placeholder = "Password"
                  name = "password"
                  onChange={this.onChangeHandler}
               />
               {this.state.errors.password? (<div className="errorFeedback">{this.state.errors.password}</div>):null      }
               <input
                  className="Input"
                  value = {this.state.password2}
                  type="password"
                  placeholder = "Confirm Password"
                  name = "password2"
                  onChange={this.onChangeHandler}
               />
               {this.state.errors.password2? (<div className="errorFeedback">{this.state.errors.password2}</div>):null      }
            </form>

            <select
               className="Input"
               value = {this.state.faculty}
               form="signUpForm"
               name="faculty"
               onChange={this.onChangeHandler}
            >


               <option value="">
                  Faculty
               </option>
               <option value="Computer">
                  Computer Engineering
               </option>
               <option value="Civil">
                  Civil Engineering
               </option>
               <option value="Mechanical">
                  Mechanical Engineering
               </option>
               <option value="Electronics">
                  Electronics Engineering
               </option>
               <option value="Electrical">
                  Electrical Engineering
               </option>
               <option value="Geomatics">
                  Geomatics Engineering
               </option>
               <option value="Automobile">
                  Automobile Engineering
               </option>


            </select>
            {this.state.errors.faculty? (<div className="errorFeedback">{this.state.errors.faculty}</div>):null      }

            <Button cls = "Success" value = "Sign Up" clicked = {this.onClickHandler} />

         </div>
      )
   }
}

SignUp.propTypes = {
   registerUser: propTypes.func.isRequired,
   auth: propTypes.object.isRequired,
   errors : propTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});


export default connect(mapStateToProps, {registerUser})(withRouter(SignUp)); //connect react and redux