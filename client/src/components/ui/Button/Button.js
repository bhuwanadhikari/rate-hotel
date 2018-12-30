import React from 'react';
import './Button.css';

const  Button = ({clicked, children, cls}) => {
   const myClasses = `${cls.toString()} Btn`;
   return (
      <button
         type="button"
         className={myClasses}
         onClick={clicked}
      >
         {children}
      </button>
   )
};
Button.propTypes = {
};
export default Button;