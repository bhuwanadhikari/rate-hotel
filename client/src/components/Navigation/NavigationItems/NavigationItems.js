
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
import { logUserOut } from '../../../redux/actions/authActions';

/*

import homeIcon from '../../../img/navImg/003-home.svg';
import hotelIcon from '../../../img/navImg/004-restaurant.svg';
import searchIcon from '../../../img/navImg/002-search-1.svg';
import profileIcon from '../../../img/navImg/005-settings.svg';
*/

class NavigationItems extends Component{
   render() {
      const {isAuthenticated, user} = this.props.auth;
      const guestNavBar = (
         <div className="NavigationItems">

            <NavigationItem link="/allhotels">
               All Hotels
            </NavigationItem>

            <NavigationItem link="/signup">
               Sign Up
            </NavigationItem>


            <NavigationItem link="/login">
               Log In
            </NavigationItem>
         </div>);

       if(isAuthenticated){ return null}else{return guestNavBar}


      /*
   <ul className="NavigationItems">

      <NavigationItem link="/">
         <img src={logo} alt="Logo of CrowApp"/>
      </NavigationItem>

      <NavigationItem active link="/">
         <img src={homeIcon} alt="Home Icon"/>
      </NavigationItem>

      <NavigationItem link = "/hotels">
         <img src={hotelIcon} alt="Hotel Icon"/>
      </NavigationItem>

      <NavigationItem link = "/search">
         <img src={searchIcon} alt="Search Icon"/>
      </NavigationItem>

      <NavigationItem link = "/profile">
         <img src={profileIcon} alt="Profile  Icon"/>
      </NavigationItem>

   </ul>
   */
   }
}
NavigationItems.propTypes = {
   logUserOut: propTypes.func.isRequired,
   auth: propTypes.object.isRequired
};

const mapStateToProps =(state) => ({
   auth: state.auth

});

export default connect(mapStateToProps, { logUserOut} )(NavigationItems);