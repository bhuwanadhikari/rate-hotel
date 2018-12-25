import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../../img/NewLogo/textLogo.svg';
import './Logo.css';
import store from '../../../redux/store/store';

const Logo = () => {
   const { isAuthenticated } = store.getState().auth;
   console.log(isAuthenticated);
   let myClass = 'GuestLogoBox';
   if(isAuthenticated === true) {
      myClass = 'AuthLogoBox'
   }
   /*const onClickLogoHandler = (e) => {
      e.preventDefault();
      window.location.reload();
   };*/
   return (
      <div className={myClass}>
         <div className="LogoWrapper">
            <Link className = "LogoLink" to='/' >
               <img className='WhiteLogo' src={whiteLogo} alt=""/>
            </Link>
         </div>
      </div>
   )
};
export default Logo;