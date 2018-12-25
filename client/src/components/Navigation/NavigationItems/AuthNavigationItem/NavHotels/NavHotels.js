import React, { Component } from 'react';
import './NavHotels.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import hotelIcon from '../../../../../img/navImg/hotels.svg';

//Style border of hotelIcon according to the path of the url
const styleBorder = (pathName) => {
   const pathArray = pathName.split("");

   const testPathArray = pathArray.filter((value, index) => index>0 && index<7);

   let myClasses = 'AuthNavLink';
   const testPath = testPathArray.join("");
   if(testPath === 'hotels'){
      myClasses = 'AuthNavLink MyActiveLink';
   }
   return myClasses;
};


class NavHotels extends Component{
   constructor() {
      super();
      this.state = {

      };

   }

   onClickHandler = (e) => {
      e.preventDefault();
      this.setState({showDrop: !this.state.showDrop});
   };
   render() {
         const myClasses = styleBorder(window.location.pathname);

         return (
            <li className="AuthNavigationItem HotelsNav">

               <NavLink className={ myClasses }  activeClassName = "ActiveLink" to={this.props.link}>
                  <img className="AuthNavIcon" src={hotelIcon} alt="Hotel Icon of CrowApp"/>
               </NavLink>
            </li>
         )




   }
}


export default NavHotels;



