import React from 'react';
import './Button.css';

const  Button = (props) => {
   const myClasses = `${props.cls.toString()} Btn`;
   return (
      <button
         type="button"
         className={myClasses}
         onClick={props.clicked}
      >
         {props.children}
      </button>
   )
};

export default Button;