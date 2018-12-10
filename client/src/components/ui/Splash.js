import React from 'react';
import logo from '../../img/logo.png';
import './Splash.css';

const splash = (props) => {/*

   let x = matchMedia("(max-width: 500px)");

   let splashPhoto = x.matches?splashaPhoto:splashdPhoto;*/
   const splashPhoto = logo;

       let splashScreen = (
          <div className='Splash'>
             <img src={splashPhoto} alt=''/>
             <div className='loading'>
                <div className='loading-bar'> </div>
                <div className='loading-bar'> </div>
                <div className='loading-bar'> </div>
                <div className='loading-bar'> </div>
             </div>
          </div>
       );

   return props.hideSplash ? null : <div>{splashScreen}</div>;

};

export default splash;