import React from 'react';
import './GuestNavigationItem.css';
import { NavLink } from 'react-router-dom';

const GuestNavigationItem = (props) =>{
   return (
      <li className ="NavigationItem">
         <NavLink activeClassName = "ActiveLink"
            to={props.link}>
            {props.children}
         </NavLink>
      </li>
   )
/*

      switch(props.children.props.src){

         case "logo":
            return (
               <li className ="GuestNavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>s
                     {props.children}
                  </a>
               </li>
            );

         case "homeIcon":
            return (
               <li className ="GuestNavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "hotelIcon":
            return (
               <li className ="GuestNavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "searchIcon":
            return (
               <li className ="GuestNavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "profileIcon":
            return (
               <li className ="GuestNavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

      }
*/

   };

export default GuestNavigationItem;