
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import GuestNavigationItem from './GuestNavigationItem/GuestNavigationItem';
import './NavigationItems.css';
import { logUserOut } from '../../../redux/actions/authActions';
import Auxi from '../../../hoc/Auxi';



import NavHome from "./AuthNavigationItem/NavHome/NavHome";
import NavHotels from "./AuthNavigationItem/NavHotels/NavHotels";
import NavSearch from "./AuthNavigationItem/NavSearch/NavSearch";
import NavAccount from "./AuthNavigationItem/NavAccount/NavAccount";


class NavigationItems extends Component{
   render() {
      const {isAuthenticated} = this.props.auth;
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
         <Auxi>
            <NavHome link = "/home"/>
            <NavHotels link = "/recommended-hotels"/>
            <NavSearch link = "/search"/>
            <NavAccount link = "/account"/>
         </Auxi>


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