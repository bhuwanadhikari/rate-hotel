import React, {Component} from 'react';
import {connect} from 'react-redux';
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



   render() {
      //extract from the redux store
      const {currentUser, profile} = this.props.data;
      //to check media
      const mediaState = profile.facebook || profile.twitter || profile.linkedIn || profile.instagram;
      //setup the social media links
      const social = {};
      social.facebook = profile.facebook? profile.facebook :"";
      social.twitter = profile.twitter? profile.twitter :"";
      social.linkedin = profile.linkedIn? profile.linkedin :"";
      social.instagram = profile.instagram? profile.instagram :"";

      //for dynamic width of location
      let customWidth, custom;
      if(profile.location !== null || profile.location !== ''){
         const length = profile.location.length;
         customWidth = (length+29)+'px';

         custom = {
            width: customWidth
         };

      }


      let transformedLinks = Object.keys(social)
         .map(soKey => {
            if(social[soKey] !== "") {
               console.log(soKey);
               return (
                  <li key={soKey}>
                     <a className="Anchor" href = {`${social[soKey]}`} >
                        <i className={`fa fa-${soKey}`} aria-hidden="true"> </i>
                     </a>
                  </li>
               );
            } else {
               console.log("empty");
               return (
                  <li key={soKey} >
                     <div className="Anchor EmptyLink"  style = {{cursor: 'disabled'}}>
                        <i className={`fa fa-${soKey}`} aria-hidden="true"> </i>
                     </div>
                  </li>
               );
            }
         });

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


            <div className="Intro">{currentUser.name}</div>
            {profile.handle?(<div className="UserName">@{profile.handle}</div>):null}


            {profile.location?(
               <div className="LocationBox" >
                  <div className="LocationWrapper">
                     <img src={locationIcon} alt="Location Icon in CrowApp"/>
                     <p className="Location">{profile.location}</p>
                  </div>
               </div>):null}


            {profile.bio ?
               (<div className="Bio">{profile.bio}</div>):null}


            <div className="StatHolder">
               <Stat name="Total Ratings Done" value="13" style = {{'border-right': '3px solid silver'}}/>
               <Stat name="Average Rating Done" value="3.7"/>
            </div>


            {mediaState?(
               <div className="Media">
                  <p>Social Media Links</p>
                  <ul>
                     {transformedLinks}
                  </ul>
               </div>):null
            }
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
