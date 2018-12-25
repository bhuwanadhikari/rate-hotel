import React from 'react';
import './NavAccount.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logUserOut } from '../../../../../redux/actions/authActions';

import Auxi from '../../../../../hoc/Auxi';

import accountIcon from '../../../../../img/navImg/account.svg';
import accountIconOrange from '../../../../../img/navImg/accountorg.svg';

class NavAccount extends React.Component {
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

   onLogOutHandler = (e) => {
      e.preventDefault();
      window.location.reload();
      this.props.logUserOut();
   };


   docClickHandler = (e) => {
      if(this.props.auth.isAuthenticated){
         const parentNode = document.getElementById('NavAccountID');
         if(parentNode){
            if(!parentNode.contains(e.target)){
               this.setState({showAcDrop: false});
            }
         }
      }
   };



   render() {


      let myClass= 'AuthNavigationItem';
      if(this.state.showAcDrop){
         myClass = 'AuthNavigationItem ActiveNavAccount'
      }

      //styling the account if it is active?? may be not applicable later
      const path = window.location.pathname;
      if(path === '/user-account'){
         myClass = myClass + ' AccountIsActive';
      }


      document.onclick = this.docClickHandler;

      return (
         <Auxi>
            <li className={myClass} id = "NavAccountID">
               <div className={`AuthNavLink NavAccountLink`} onClick = {this.onClickHandler}>
                  <img className="AuthNavIcon" src={this.state.showAcDrop?accountIconOrange:accountIcon} alt="Account Icon of CrowApp"/>
               </div>

            </li>
            {this.state.showAcDrop?(
               <ul className="AccountNavSec">

                  <li className="AccountLinkList Normal">
                     <NavLink className = "AccountLink " to = '/user-account'>Profile</NavLink>
                  </li>

                  <li className="AccountLinkList Normal">
                     <NavLink className = "AccountLink" to = '/settings-and-privacy'>Settings and Privacy</NavLink>
                  </li>

                  <li className="AccountLinkList Normal" onClick={ this.onLogOutHandler }>
                     <div className = "AccountLink LogOut">Log Out</div>
                  </li>

                  <li className="AccountLinkList">
                     <NavLink className = "AccountLink Disabled" to = '/disabled'>Advanced</NavLink>
                  </li>

                  <li className="AccountLinkList Abnormal">
                     <NavLink className = "AccountLink " to = '/about-us'>About Us</NavLink>
                  </li>

                  <li className="AccountLinkList Abnormal">
                     <NavLink className = "AccountLink " to = '/help'>Help</NavLink>
                  </li>

                  <li className="AccountLinkList">
                     <NavLink className = "AccountLink Disabled" to = '/disabled'>Go Premium</NavLink>
                  </li>

               </ul>):null}
         </Auxi>
      )
   }
}

NavAccount.propTypes = {
   logUserOut: propTypes.func.isRequired,
   auth: propTypes.object.isRequired

};

const mapStateToProps = (state) => ({
   auth: state.auth
});

export default  connect(mapStateToProps, {logUserOut})(NavAccount);