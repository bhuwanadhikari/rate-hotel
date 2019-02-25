import React from 'react';
import Auxi from '../../../hoc/Auxi';

import './InputField.css';

const InputField = ({autofocus,type, name, value, changed, placeholder, errors, extraCls}) => {

   return (
      <Auxi>
         <input
            autoFocus={autofocus}
            className={`InputField ${extraCls}`}
            type={type}
            name={name}
            value = {value}
            onChange={changed}
            placeholder={placeholder}
         />

         {errors[name]? (<div className="errorFeedback">{errors[name]}</div>):null}
      </Auxi>

   );
};

export default InputField;
