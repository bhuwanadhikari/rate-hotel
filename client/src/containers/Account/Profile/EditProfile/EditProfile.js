import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import InputField from '../../../../components/ui/InputField/InputField';
import Button from '../../../../components/ui/Button/Button';
import './EditProfile.css';

import {getCurrentProfile,editCurrentProfile} from '../../../../redux/actions/profileActions';

class EditProfile extends Component {
   constructor(){
      super();
      this.state = {
         handle: "",
         location: "",
         bio: "",
         facebook: "",
         twitter: "",
         linkedIn: "",
         instagram: "",
         errors : {}
      }
   }




   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});

      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   onSaveHandler = (e) => {
      e.preventDefault();

      const profileData = {
         handle: this.state.handle,
         location: this.state.location,
         bio: this.state.bio,
         facebook: this.state.facebook,
         twitter: this.state.twitter,
         linkedIn: this.state.linkedIn,
         instagram: this.state.instagram
      };
      this.props.editCurrentProfile(profileData);
   };



   componentWillReceiveProps(nextProps) {
      if(Object.keys(nextProps.errors).length > 0) {
         this.setState({errors: nextProps.errors});
      }
      if(nextProps.errors.msg === 'cleared'){
         this.props.modalClosed();

      }


   }

componentDidMount(){
   const profile = this.props.profile.profile;
   console.log(this.props.profile.profile);

   const proArr = ['handle','location','bio','facebook','twitter','linkedIn','instagram'];

   if(profile){
      for(let index in proArr){
         const  key = proArr[index];
         if(profile[key]) {
            this.setState({[key]: profile[key]});
         }
      }
   }
}







render() {
   return (
      <form className="EditProfileBox" noValidate>
         <h1>Edit Profile</h1>
         <InputField
            value = {this.state.handle || ""}
            type = "text"
            name = "handle"
            placeholder = "Username"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />
         <InputField
            value = {this.state.location || ""}
            type = "text"
            name = "location"
            placeholder = "Location"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />
         <InputField
            value = {this.state.bio || ""}
            extraCls = "TextArea"
            type = "text"
            name = "bio"
            placeholder = "Bio"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />

         <InputField
            value = {this.state.facebook || ""}
            type = "url"
            extraCls = "SocialMediaLink"
            name = "facebook"
            placeholder = "Facebook Link"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />

         <InputField
            value = {this.state.twitter || ""}
            type = "url"
            extraCls = "SocialMediaLink"
            name = "twitter"
            placeholder = "Twitter Link"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />

         <InputField
            value = {this.state.linkedIn || ""}
            type = "url"
            extraCls = "SocialMediaLink"
            name = "linkedIn"
            placeholder = "LinkedIn Link"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />

         <InputField
            value = {this.state.instagram || ""}
            type = "url"
            extraCls = "SocialMediaLink"
            name = "instagram"
            placeholder = "Instagram Link"
            changed = {this.onChangeHandler}
            errors={this.state.errors}
         />

         <Button clicked={this.props.modalClosed} cls = "Warning InlineBtn" >Cancel</Button>
         <Button clicked={this.onSaveHandler} cls = "Success InlineBtn" >Save</Button>
      </form>

   );
}
}

function mapStateToProps(state) {
   return {
      profile: state.profile,
      errors: state.errors
   };
}

EditProfile.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   editCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object
};

export default connect(mapStateToProps,{getCurrentProfile, editCurrentProfile})(EditProfile);
