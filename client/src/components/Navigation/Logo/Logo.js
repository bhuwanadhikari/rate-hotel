import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../../img/navImg/whitelogo.svg';
import './Logo.css';

const Logo = () => {
   return (
         <Link to='/' >
            <img className='WhiteLogo' src={whiteLogo} alt=""/>
         </Link>
   )
};

export default Logo;