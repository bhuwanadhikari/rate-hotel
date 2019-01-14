import React from 'react';
import './RateOnly.css';


// takes averageRating as props
const RateOnly = (props) => {

   const averageRating = props.averageRating;
   const avgRateArr = [];
   if(averageRating>=1) {
      let mode = (Math.floor(averageRating))%5;
      console.log("mode 1: ", mode);
      for (let i = 1; i <= mode; i++) {
         avgRateArr.push(10);
      }

      let mode2 = Math.ceil((averageRating*10)%10);
      console.log("mode 2: ", mode2);
      for(let i = mode+1; i <= 5; i++){
         if(i === mode+1){
            avgRateArr.push(mode2);
         }else {
            avgRateArr.push(0);
         }
      }

   }else {

      avgRateArr.push(averageRating*10, 0, 0, 0, 0);
   }

   console.log(avgRateArr);
   const rateElementBasicStyles = {
      position: 'relative',
      zIndex: 3,
      top: 0,
      left: 0,
      display: 'block',
      height: '10px',
      backgroundColor: 'green'};

   const styles = {
      one:{...rateElementBasicStyles, width:avgRateArr[0]},
      two:{...rateElementBasicStyles, width:avgRateArr[1]},
      three:{...rateElementBasicStyles, width:avgRateArr[2]},
      four:{...rateElementBasicStyles, width:avgRateArr[3]},
      five:{...rateElementBasicStyles, width:avgRateArr[4]}
   };
   return(
      <div className="RateContainer">
         <div className="RateBox">

            <div className="RateSpan" >
               <div className="RateField">
                  <div className="RateElement" style = {styles.one}> </div>
               </div>
            </div>
            <div className="RateSpan">
               <div className="RateField">
                  <div className="RateElement" style = {styles.two}> </div>
               </div>
            </div>
            <div className="RateSpan">
               <div className="RateField">
                  <div className="RateElement" style = {styles.three}> </div>
               </div>
            </div>
            <div className="RateSpan">
               <div className="RateField">
                  <div className="RateElement" style = {styles.four}> </div>
               </div>
            </div>
            <div className="RateSpan">
               <div className="RateField">
                  <div className="RateElement" style = {styles.five}> </div>
               </div>
            </div>
         </div>
         <div className="AvgRatingBox"><div className="AvgRating">{props.averageRating}</div></div>
      </div>
   )
};


export default RateOnly;