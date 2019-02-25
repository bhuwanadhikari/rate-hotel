import React, {Component} from 'react';

import InputField from '../../../../../components/ui/InputField/InputField';
import Button from '../../../../../components/ui/Button/Button';
import axios from 'axios';


class Feedback extends Component {
   constructor(){
      super();
      this.state = {
         name: '',
         feedback: ''
      }
   }




   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});
   };

   onSaveHandler = (e) => {
      e.preventDefault();
      this.props.modalClosed();
      axios.post('/api/users/feedback', "feedbackData").then((res)=> {
         alert("Your Feedback is received by CrowApp Server successfully");
      }).then(()=>{
         alert("Sorry something went wrong, Please Try Again!");
      });
   };

   componentWillReceiveProps(nextProps) {

   }

   componentDidMount(){

   }







   render() {
      return (
         <form className="EditProfileBox" noValidate>
            <h1>Send Us Message/Feedback</h1>
            <InputField
               autofocus={true}
               value = {this.state.handle || ""}
               type = "text"
               name = "handle"
               placeholder = "Your name(Optional)"
               changed = {this.onChangeHandler}
               errors={{}}
            />
            <InputField
               value = {this.state.bio || ""}
               extraCls = "TextArea"
               type = "text"
               name = "bio"
               placeholder = "Feedback Message"
               changed = {this.onChangeHandler}
               errors={{}}
            />
            <Button clicked={this.props.modalClosed} cls = "Warning InlineBtn" >Cancel</Button>
            <Button clicked={this.onSaveHandler} cls = "Success InlineBtn" >Send Feedback</Button>
         </form>

      );
   }
}


export default Feedback;
