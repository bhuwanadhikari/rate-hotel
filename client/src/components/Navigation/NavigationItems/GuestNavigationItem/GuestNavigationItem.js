import React from 'react';
import './GuestNavigationItem.css';
import { NavLink } from 'react-router-dom';

const GuestNavigationItem = (props) =>{
   return (
      <li className ="GuestNavigationItem">
         <NavLink activeClassName = "ActiveLink" to={props.link}>
            {props.children}
         </NavLink>
      </li>
   )
};

export default GuestNavigationItem;