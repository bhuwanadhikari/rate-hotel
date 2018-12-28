import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


import './ProfileCard.css';
import Stat from './Stat/Stat';
import Option from './Option/Option';

import locationIcon from '../../../../img/forProfile/location.svg'

class ProfileCard extends Component {
   render() {
      return (
         <div className="ProfileCard">


            <div className="AvatarHolder">
               <div className="Transformable">
                  <Option/>
               </div>
               <div className="Avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmghCm0SV4l6odB47zIsTuMaWoFbDaFC9M1u_Kyj72hSbe5IUX" alt="Avatar for user profile"/>
               </div>
            </div>


            <div className="Intro">Sammelan Yogi</div>
            <div className="UserName">@sammy_hero</div>

            <div className="LocationBox">
               <img src={locationIcon} alt="Location Icon in CrowApp"/>
               <p className="Location">   Lamachaur, Pokhara</p>
            </div>
            <div className="Bio">Literature is in my blood. Interests in Basketball and Blogging. Student of Compter engineering</div>

            <div className="StatHolder">
               <Stat name="Total Ratings Done" value="13" style = {{'border-right': '3px solid silver'}}/>
               <Stat name="Average Rating Done" value="3.7"/>
            </div>


            {/*<div className="Study">*/}
               {/*<div className="Faculty">Mechanical Engineering</div>*/}
               {/*<div className="Year">Fourth Year</div>*/}
            {/*</div>*/}

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

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(
   mapStateToProps,
)(ProfileCard);
