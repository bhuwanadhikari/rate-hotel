import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../../redux/actions/profileActions';

import './Profile.css';
import ProfileCard from './ProfileCard/ProfileCard';
import Activity from './Activity/Activity';


import Modal from '../../../components/ui/Modal/Modal';
import EditProfile from './EditProfile/EditProfile';

class Profile extends Component {
   constructor(props){
      super(props);
      this.state = {
         showModal: false
      };
   }

   onBackDropClickHandler = (e) => {
      e.preventDefault();
      this.setState({showModal: false});
   };

   onOptionHandler = (e) => {
      e.preventDefault();
      this.setState({showModal: true});
   };

   componentDidMount(){
      this.props.getCurrentProfile();
   }

   render() {
      return (
         <div className="ProfileContainer">

            <Modal show = {this.state.showModal} modalClosed = {this.onBackDropClickHandler}>
               <EditProfile modalClosed = {this.onBackDropClickHandler}/>
            </Modal>

            <ProfileCard optioned = {this.onOptionHandler}/>
            <Activity/>
         </div>
      );
   }
}


Profile.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};

function mapStateToProps(state) {
   return {
      profile: state.profile
   };
}



export default connect(mapStateToProps,{ getCurrentProfile})(Profile);
