import React from 'react';
import optionIcon from '../../../../../img/forProfile/pencil-edit-button.svg'

import './Option.css';

const Option = (props) => {

   return (
      <div className="OptionIcon" onClick = {props.clicked} >
         <img src={optionIcon} alt="Option Icon of the Crow App in Profile page"/>
      </div>
   );
};

export default Option;
