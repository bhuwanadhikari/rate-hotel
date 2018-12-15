import React from 'react';
import  './NavigationItem.css';
import { Link } from 'react-router-dom';

const NavigationItem = (props) =>{
   return (
      <li className ="NavigationItem">
         <Link
            to={props.link}
            className={props.active? "active" : null}  >
            {props.children}
         </Link>
      </li>
   )
/*

      switch(props.children.props.src){

         case "logo":
            return (
               <li className ="NavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>s
                     {props.children}
                  </a>
               </li>
            );

         case "homeIcon":
            return (
               <li className ="NavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "hotelIcon":
            return (
               <li className ="NavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "searchIcon":
            return (
               <li className ="NavigationItem">
                  <a
                     href={props.link}
                     className={props.active? "active" : null}>
                     {props.children}
                  </a>
               </li>
            );

         case "profileIcon":
            return (
               <li className ="NavigationItem">
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

export default NavigationItem;