import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, getCurrentUser } from '../../../redux/actions/profileActions';

import './Profile.css';
import ProfileCard from './ProfileCard/ProfileCard';
import Activity from './Activity/Activity';


import Modal from '../../../components/ui/Modal/Modal';
import Spinner from '../../../components/ui/Spinnner/Spinner';
import EditProfile from './EditProfile/EditProfile';

class Profile extends Component {
   constructor(props){
      super(props);
      this.state = {
         showModal: false
      };
   }

   onBackDropClickHandler = () => {
         this.setState({showModal: false});
   };

   onOptionHandler = (e) => {
      e.preventDefault();
      this.setState({showModal: true});
   };

   componentDidMount(){
      this.props.getCurrentUser();
      this.props.getCurrentProfile();
   }

   render() {
      const {profile, loading, currentUser} = this.props.profile;
      if(profile === null || loading < 3 || currentUser === null){
         return <Spinner/>
      }else {
         return (
            <div className="ProfileContainer">

               <Modal show={this.state.showModal} modalClosed={this.onBackDropClickHandler}>
                  <EditProfile modalClosed={this.onBackDropClickHandler}/>
               </Modal>

               <ProfileCard data={this.props.profile} optioned={this.onOptionHandler}/>
               <Activity/>
            </div>
         );
      }
   }
}


Profile.propTypes = {
   getCurrentUser: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
   return {
      profile: state.profile,
      errors: state.errors
   };
}



export default connect(mapStateToProps,{getCurrentUser, getCurrentProfile})(Profile);
