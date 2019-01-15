import React from 'react';
import Button from '../../../components/ui/Button/Button';

import RateOnly from './RateOnly/RateOnly';
import './RateView.css'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class RateView extends React.Component {

   onDoRatingHandler = () => {

   };
   render() {
      return (
         <div className="RateViewBox">


            <div className="RateViewHeader">
               <div className="RateName">Variability in Items</div>
               <div className="noOfRatings">(34 Ratings)</div>
            </div>

            <div className="RateViewFooter">
               <div className="RateOnlyWrapper">
                  <RateOnly averageRating="4.4"/>
               </div>
               <div className="ButtonWrapper">
                  <Button
                     cls="Success InlineBtn Smaller"
                     clicked={this.onDoRatingHandler}
                  >Rate Lunch</Button>
               </div>
            </div>


         </div>
      );
   }
}

export default RateView;