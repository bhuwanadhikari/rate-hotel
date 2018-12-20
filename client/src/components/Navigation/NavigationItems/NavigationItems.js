
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import GuestNavigationItem from './GuestNavigationItem/GuestNavigationItem';
import './NavigationItems.css';
import { logUserOut } from '../../../redux/actions/authActions';
import Auxi from '../../../hoc/Auxi';



import homeIcon from '../../../img/navImg/003-home.svg';
import hotelIcon from '../../../img/navImg/004-restaurant.svg';
import searchIcon from '../../../img/navImg/002-search-1.svg';
import profileIcon from '../../../img/navImg/005-settings.svg';


class NavigationItems extends Component{
   render() {
      const {isAuthenticated, user} = this.props.auth;
      const guestNavBar = (

         <Auxi>
            <GuestNavigationItem link="/allhotels">
               All Hotels
            </GuestNavigationItem>

            <GuestNavigationItem link="/signup">
               Sign Up
            </GuestNavigationItem>


            <GuestNavigationItem link="/login">
               Log In
            </GuestNavigationItem>
         </Auxi>
      );

      const authNavBar = (

         <div>Auth Navbar</div>

      );

      return (
         <div className="NavigationItems">
            {isAuthenticated?authNavBar:guestNavBar}
         </div>
      );



   }
}
NavigationItems.propTypes = {
   logUserOut: propTypes.func.isRequired,
   auth: propTypes.object.isRequired
};

const mapStateToProps =(state) => ({
   auth: state.auth

});

export default connect(mapStateToProps, { logUserOut}, null, {pure: false} )(NavigationItems);