import React from 'react';
import './RateOnly.css';

// import '../../../../assets/bootstrap/css/bootstrap.css';




// takes averageRating as props
const RateOnly = (props) => {

   const widthValue = (props.averageRating*20).toString()+'%';
   return(
      <div className="RateContainer">
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