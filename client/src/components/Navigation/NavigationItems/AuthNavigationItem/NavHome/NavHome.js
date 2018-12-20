import React from 'react';
import './NavHome.css.css';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../../../../img/navImg/003-home.svg';

const NavHome = (props) =>{
   return (
      <li className ="AuthNavigationItem">
         <NavLink  activeClassName = "ActiveLink" to={props.link}>
            <img src={homeIcon} alt="Home Icon of CrowApp"/>
         </NavLink>
      </li>
)

};

export default NavHome;