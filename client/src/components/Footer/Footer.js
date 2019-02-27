import React from 'react';
import {NavLink} from 'react-router-dom';
import './Footer.css';
import Modal from '../ui/Modal/Modal';
import Feedback from '../Navigation/NavigationItems/AuthNavigationItem/NavAccount/Feedback';
import InputField from '../ui/InputField/InputField';
import Button from '../ui/Button/Button';

import axios from 'axios';


class  Footer extends React.Component{
   constructor(props){
      super(props);
      this.state={
         showFeedbackModal: false,
         showAddHotelModal: false,
         name: '',
         email: '',
         bio: '',
         location: '',
         errors:{},

      };
   }

   onBackDropClickHandler = ()=>{
      this.setState({showFeedbackModal: false,showAddHotelModal: false });
   };

   onFeedbackClickHandler = () => {
      this.setState({showFeedbackModal: true});
   };

   onAddHotelClickHandler = () => {
      this.setState({showAddHotelModal: false});
   };

   //For addition of Hotels--------------------------------------------
   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});

      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   onSubmitHandler = (e) => {
      e.preventDefault();

      const hotelData = {
         name: this.state.name,
         email: this.state.email,
         location: this.state.location,
         bio: this.state.bio,
      };
      axios.post('/api/hotels/register', hotelData)
         .then(res=> {
               alert("Hotel Added successfully");
               this.setState({showAddHotelModal: false});

         })
         .catch(e => {
            console.log(e.response.data);
            this.setState({errors: e.response.data});
            });
   };


   render() {
      return (
         <div className="Footer">

            {/*Modal for the feedback-----------------------*/}
            <Modal show={this.state.showFeedbackModal} modalClosed={this.onBackDropClickHandler} fromTop = '20%'>
               <Feedback modalClosed={this.onBackDropClickHandler} feedbackHeading={"Send Us a Feedback"}/>
            </Modal>

            <div className="FooterHeader">
               <li className={"FooterList"}><NavLink className={"FooterLink"} to='/about-us'>About</NavLink></li>
               <li className={"FooterList"}>
                  <div className={"FooterLink"} onClick={this.onFeedbackClickHandler}>Feedback</div>
               </li>
               <li className={"FooterList"}><NavLink className={"FooterLink"} to='/settings-and-privacy'>Privacy Policy</NavLink></li>
               <li className={"FooterList"}><NavLink className={"FooterLink"} to='/help'>Help</NavLink></li>
               <li className={"FooterList"}>
                  <div className={"FooterLink"} onClick={this.onAddHotelClickHandler}>Add Hotel</div>
               </li>
            </div>

            {/*Modal for the add hotel-----------------------*/}
            <Modal show={this.state.showAddHotelModal} modalClosed={this.onBackDropClickHandler} fromTop = '5%'>

               <form className="EditProfileBox" noValidate>
                  <h1>Add Hotel</h1>
                  <InputField
                     autofocus={true}
                     value = {this.state.name || ""}
                     type = "text"
                     name = "name"
                     placeholder = "Name of Hotel"
                     changed = {this.onChangeHandler}
                     errors={this.state.errors}
                  />
                  <InputField
                     value = {this.state.email || ""}
                     type = "email"
                     name = "email"
                     placeholder = "Email of Hotel Owner"
                     changed = {this.onChangeHandler}
                     errors={this.state.errors}
                  />
                  <InputField
                     value = {this.state.location || ""}
                     type = "text"
                     name = "location"
                     placeholder = "Hotel's Location"
                     changed = {this.onChangeHandler}
                     errors={this.state.errors}
                  />
                  <InputField
                     value = {this.state.bio || ""}
                     extraCls = "TextArea"
                     type = "text"
                     name = "bio"
                     placeholder = "Description of Hotel(like facilities and services)"
                     changed = {this.onChangeHandler}
                     errors={this.state.errors}
                  />

                  <Button clicked={this.onBackDropClickHandler} cls = "Warning InlineBtn" >Cancel</Button>
                  <Button clicked={this.onSubmitHandler} cls = "Success InlineBtn" >Submit</Button>
               </form>

            </Modal>

            <div className="FooterFooter">
               {new Date().getFullYear()} CrowApp. All Rights Reserved
            </div>

         </div>
      )
   }
};


export default Footer;
