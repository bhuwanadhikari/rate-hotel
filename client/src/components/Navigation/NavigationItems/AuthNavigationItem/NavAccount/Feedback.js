import React, {Component} from 'react';

import InputField from '../../../../../components/ui/InputField/InputField';
import Button from '../../../../../components/ui/Button/Button';
import axios from 'axios';


class Feedback extends Component {
   constructor(){
      super();
      this.state = {
         name: '',
         bio: ''
      }
   }

   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});
   };

   onSaveHandler = (e) => {
      e.preventDefault();
      this.props.modalClosed();
      const feedbackData = {
         name: this.state.name,
         feedback: this.state.bio,
      };
      // console.log(feedbackData);
      axios.post('/api/users/feedback', feedbackData).then((res)=> {
         alert("Your Feedback is received by CrowApp Server successfully");
      }).catch(()=>{
         alert("Sorry something went wrong, Please Try Again!");
      });
   };

   render() {
      return (
         <form className="EditProfileBox" noValidate>
            <h1>{this.props.feedbackHeading}</h1>
            <InputField
               autofocus={true}
               value = {this.state.name || ""}
               type = "text"
               name = "name"
               placeholder = "Your name(Optional)"
               changed = {this.onChangeHandler}
               errors={{}}
            />
            <InputField
               value = {this.state.bio || ""}
               extraCls = "TextArea"
               type = "text"
               name = "bio"
               placeholder = "Type your message here"
               changed = {this.onChangeHandler}
               errors={{}}
            />
            <Button clicked={this.props.modalClosed} cls = "Warning InlineBtn" >Cancel</Button>
            <Button clicked={this.onSaveHandler} cls = "Success InlineBtn" >Send</Button>
         </form>

      );
   }
}


export default Feedback;
