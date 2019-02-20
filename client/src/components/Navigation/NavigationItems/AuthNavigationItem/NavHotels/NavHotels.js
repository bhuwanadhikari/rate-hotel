import React, { Component } from 'react';
import './NavHotels.css';
import '../AuthNavigationItem.css';
import { NavLink, withRouter } from 'react-router-dom';

import hotelIcon from '../../../../../img/navImg/hotels.svg';



class NavHotels extends Component{
   constructor() {
      super();
      this.state = {

      };

   }

   render() {

      //Style border of hotelIcon according to the path of the url
      const styleBorder = (pathName) => {
         const pathArray = pathName.split("");

         const testPathArray = pathArray.filter((value, index) => index>0 && index<7);

         let myClasses = 'AuthNavLink';
         const testPath = testPathArray.join("");
         if(testPath === 'hotels' || 'hotel' && (testPath !== 'home')){
            myClasses = 'AuthNavLink MyActiveLink';
         }
         return myClasses;
      };

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


export default withRouter(NavHotels);



