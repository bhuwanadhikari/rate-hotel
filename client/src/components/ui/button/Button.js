import React from 'react';
import './Button.css';

const  Button = (props) => {
   return (
      <button
         type="button"
         className={props.cls}
         onClick={props.clicked}
      >
         {props.value}
      </button>
   )
};

export default Button;