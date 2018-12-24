import React from 'react';
import './NavAccount.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import Auxi from '../../../../../hoc/Auxi';

import accountIcon from '../../../../../img/navImg/account.svg';

class NavAccount extends React.Component{
   constructor(){
      super();
      this.state = {
         showAcDrop: false
      };
   }
   onClickHandler = (e) => {
      e.preventDefault();
      this.setState({showAcDrop: !this.state.showAcDrop});
   };

   docClickHandler = (e) => {
     const node = document.getElementById('NavAccountID');
     if(!node.contains(e.target)){
        this.setState({showAcDrop: false});
     }
   };


   render() {
      document.onclick = this.docClickHandler;
      return (
         <Auxi>
            <li className="AuthNavigationItem" id = "NavAccountID">
               <div className="AuthNavLink" onClick = {this.onClickHandler}>
                  <img className="AuthNavIcon" src={accountIcon} alt="Account Icon of CrowApp"/>
               </div>

            </li>
            {this.state.showAcDrop?(<ul className="AccountNavSec">

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Normal" to = '/user-profile'>Profile</NavLink>
               </li>

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Normal" to = '/settings-and-privacy'>Settings and Privacy</NavLink>
               </li>

               <li className="AccountLinkList">
                  <div className = "AccountLink LogOut">Log Out</div>
               </li>

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Disabled" to = '/disabled'>Disabled</NavLink>
               </li>

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Abnormal" to = '/about-us'>About Us</NavLink>
               </li>

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Abnormal" to = '/help'>Help</NavLink>
               </li>

               <li className="AccountLinkList">
                  <NavLink className = "AccountLink Disabled" to = '/disabled'>Disabled</NavLink>
               </li>

            </ul>):null}
         </Auxi>
      )
   }
}

export default NavAccount;