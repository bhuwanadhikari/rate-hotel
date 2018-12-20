import React from 'react';
import './NavHotels.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../../../../img/navImg/hotels.svg';

const NavHotels = (props) =>{
   return (
      <li className ="AuthNavigationItem">
         <NavLink className="AuthNavLink"  activeClassName = "ActiveLink" to={props.link}>
            <img className="AuthNavIcon" src={homeIcon} alt="Home Icon of CrowApp"/>
         </NavLink>
      </li>
   )
};

export default NavHotels;