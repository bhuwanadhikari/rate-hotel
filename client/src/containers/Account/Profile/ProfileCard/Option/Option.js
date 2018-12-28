import React from 'react';
import optionIcon from '../../../../../img/forProfile/pencil-edit-button.svg'

import './Option.css';

const Option = () => {
   return (
      <div className="OptionIcon">
         <img src={optionIcon} alt="Option Icon of the Crow App in Profile page"/>
      </div>
   );
};

export default Option;
