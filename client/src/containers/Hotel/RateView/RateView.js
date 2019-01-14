import React from 'react';
import Button from '../../../components/ui/Button/Button';

import RateOnly from './RateOnly/RateOnly';
import './RateView.css'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class RateView extends React.Component {

   onDoRatingHander = () => {

   };
   render() {
      return (
         <div className="RateViewBox">
            <div className="RateViewHeader">
               <div className="RateName">LUNCH</div>
               <div className="ButtonBox">
                  <Button
                     cls="Success InlineBtn Smaller"
                     clicked={this.onDoRatingHandler}
                  >Rate Lunch</Button>
               </div>
            </div>
            <RateOnly averageRating="4.4"/>
         </div>
      );
   }
};

export default RateView;