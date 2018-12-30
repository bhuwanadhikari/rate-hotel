import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile, getCurrentUser } from '../../../../redux/actions/profileActions';


import './ProfileCard.css';
import Stat from './Stat/Stat';
import Option from './Option/Option';

import locationIcon from '../../../../img/forProfile/location.svg'

class ProfileCard extends Component {
   constructor(){
      super();
      this.state = {};
   }

   componentDidMount(){
      this.props.getCurrentUser();
   }


   render() {
      // const {profile} = this.props.profile;
      let profile = {};




      return (
         <div className="ProfileCard">


            <div className="AvatarHolder">
               <div className="Transformable">
                  <Option clicked = {this.props.optioned} />
               </div>
               <div className="Avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmghCm0SV4l6odB47zIsTuMaWoFbDaFC9M1u_Kyj72hSbe5IUX" alt="Avatar for user profile"/>
               </div>
            </div>


            <div className="Intro">{this.props.auth.name}</div>
            {profile.handle?(<div className="UserName">@{profile.handle}</div>):null}


            {profile.location?(
            <div className="LocationBox">
               <img src={locationIcon} alt="Location Icon in CrowApp"/>
               <p className="Location">{profile.location}</p>
            </div>):null}


            {profile.bio ?
               (<div className="Bio">Literature is in my blood. Interests in Basketball and Blogging. Student of Compter
                  engineering</div>):null}


            <div className="StatHolder">
               <Stat name="Total Ratings Done" value="13" style = {{'border-right': '3px solid silver'}}/>
               <Stat name="Average Rating Done" value="3.7"/>
            </div>



            <div className="Media">
               <p>Social Media Links</p>
               <ul>
                  <li><NavLink to="/" ><i className="fa fa-facebook" aria-hidden="true"> </i></NavLink></li>
                  <li><NavLink to="/" ><i className="fa fa-twitter" aria-hidden="true"> </i></NavLink></li>
                  <li><NavLink to="/" ><i className="fa fa-linkedin" aria-hidden="true"> </i></NavLink></li>
                  <li><NavLink to="/" ><i className="fa fa-instagram" aria-hidden="true"> </i></NavLink></li>
               </ul>
            </div>
         </div>
      );
   }
}

ProfileCard.propTypes = {
   getCurrentUser: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


function mapStateToProps(state) {
   return {
      auth: state.auth,
      profile: state.profile
   };
}

export default connect(mapStateToProps, {getCurrentProfile, getCurrentUser})(ProfileCard);
