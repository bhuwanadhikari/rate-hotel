import React from 'react';

const Stat = (props) => {
   return (
      <div className="Stat">
         <div className="StatValue" >{props.value}</div>
         <div className="StatName">{props.name}</div>
      </div>
   );
};

export default Stat;
