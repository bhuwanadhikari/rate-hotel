import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../../img/navImg/whitelogo.svg';
import './Logo.css';
import store from '../../../redux/store/store';

const Logo = () => {
   // const { isAuthenticated } = store.getState().auth;
   // console.log(isAuthenticated);
   let link = '/';
   // if(isAuthenticated){
   //    link = '/home';
   // }
   /*const onClickLogoHandler = (e) => {
      e.preventDefault();
      window.location.reload();
   };*/
   return (
         <Link className = "LogoLink" to='/' >
            <img className='WhiteLogo' src={whiteLogo} alt=""/>
         </Link>
   )
};
export default Logo;