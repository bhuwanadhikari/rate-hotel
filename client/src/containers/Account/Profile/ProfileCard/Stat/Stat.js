import React from 'react';
import RateOnly from '../../../../Hotel/RateView/RateOnly/RateOnly';

const Stat = (props) => {
   return (
      <div className="StatHolderWrap">
         <div className="StatHolderHotel">
            <RateOnly averageRating={props.averageOfAll}/>
         </div>
      </div>
   );
};

export default Stat;
