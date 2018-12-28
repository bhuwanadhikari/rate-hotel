import React from 'react';

const BackDrop = (props) => {
   return props.show ? (<div onClick={props.clicked} className="BackDrop"> </div>):null;
};

export default BackDrop;
