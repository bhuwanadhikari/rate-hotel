import React from 'react';
import './Landing.css';
import androidbg from '../../img/backImages/androidbg2.jpg';
import desktopbg from '../../img/backImages/desktopbg2.jpg';
import Button from '../ui/button/Button';

const Landing = () => {
   const match = matchMedia("(min-width: 450px)");

   const backImg = match.matches?desktopbg:androidbg;
   return(
      <div className="Landing">
         <img src={backImg} alt="Background of CrowApp"/>
         <div className="Container">
            <Button cls = "Success" value = "Sign Up" />
            <Button cls = "Success" value = "Log In" />
            <div className="Command">
               Log In to find top hotels
            </div>

         </div>
      </div>
   )
};


export default Landing;
