import React from 'react';
import './NavAccount.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../../../../img/navImg/account.svg';

class NavAccount extends React.Component{
   render() {
      return (
         <li className="AuthNavigationItem">
            <NavLink className="AuthNavLink" activeClassName="ActiveLink" to={this.props.link}>
               <img className="AuthNavIcon" src={homeIcon} alt="Home Icon of CrowApp"/>
            </NavLink>
         </li>
      )
   }
}

export default NavAccount;