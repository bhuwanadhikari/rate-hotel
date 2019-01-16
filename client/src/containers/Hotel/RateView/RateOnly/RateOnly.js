import React from 'react';
import './RateOnly.css';

// import '../../../../assets/bootstrap/css/bootstrap.css';




// takes averageRating as props
const RateOnly = (props) => {

   const widthValue = (props.averageRating*20).toString()+'%';
   return(
      <div className="RateContainer">
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/solid.css" integrity="sha384-+0VIRx+yz1WBcCTXBkVQYIBVNEFH1eP6Zknm16roZCyeNg2maWEpk/l/KsyFKs7G" crossorigin="anonymous"/>
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css" integrity="sha384-jLuaxTTBR42U2qJ/pm4JRouHkEDHkVqH0T1nyQXn1mZ7Snycpf6Rl25VBNthU4z0" crossorigin="anonymous"/>
         <div className="RateBox">
            <div className="stars-outer">
               <div className="stars-inner" style= {{width: widthValue}} > </div>
            </div>
         </div>
         <div className="AvgRatingBox"><div className="AvgRating">{props.averageRating}</div></div>

      </div>
   )
};


export default RateOnly;