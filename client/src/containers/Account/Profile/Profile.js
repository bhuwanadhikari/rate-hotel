import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../../redux/actions/profileActions';

import './Profile.css';
import ProfileCard from './ProfileCard/ProfileCard';
import Activity from './Activity/Activity';

class Profile extends Component {

   componentDidMount(){
      this.props.getCurrentProfile();
   }

   render() {
      return (
         <div className="ProfileContainer">
            <ProfileCard/>
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
