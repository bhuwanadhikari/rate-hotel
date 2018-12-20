
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import GuestNavigationItem from './GuestNavigationItem/GuestNavigationItem';
import './NavigationItems.css';
import { logUserOut } from '../../../redux/actions/authActions';



import homeIcon from '../../../img/navImg/003-home.svg';
import hotelIcon from '../../../img/navImg/004-restaurant.svg';
import searchIcon from '../../../img/navImg/002-search-1.svg';
import profileIcon from '../../../img/navImg/005-settings.svg';


class NavigationItems extends Component{
   render() {
      const {isAuthenticated, user} = this.props.auth;
      const guestNavBar = (
         <div className="NavigationItems">

            <GuestNavigationItem link="/allhotels">
               All Hotels
            </GuestNavigationItem>

            <GuestNavigationItem link="/signup">
               Sign Up
            </GuestNavigationItem>


            <GuestNavigationItem link="/login">
               Log In
            </GuestNavigationItem>
         </div>);

      const authNavBar = (

         <ul className="NavigationItems">

            <GuestNavigationItem active link="/">
               <img src={homeIcon} alt="Home Icon"/>
            </GuestNavigationItem>

            <GuestNavigationItem link = "/hotels">
               <img src={hotelIcon} alt="Hotel Icon"/>
            </GuestNavigationItem>

            <GuestNavigationItem link = "/search">
               <img src={searchIcon} alt="Search Icon"/>
            </GuestNavigationItem>

            <GuestNavigationItem link = "/profile">
               <img src={profileIcon} alt="Profile  Icon"/>
            </GuestNavigationItem>

         </ul>

      );

       if(isAuthenticated){ return authNavBar}else{return guestNavBar}



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