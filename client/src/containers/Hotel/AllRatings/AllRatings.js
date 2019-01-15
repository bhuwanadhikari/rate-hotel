import React, {Component} from 'react';
import {connect} from 'react-redux';

import RateView from '../RateView/RateView';
import './AllRatings.css';

class AllRatings extends Component {
   render() {
      return (
         <div className= "AllRatingsBox">
            <div className="MealBox"> </div>
            <div className="OtherRatingBox">
            <RateView/>
            <RateView/>
            <RateView/>
            <RateView/>
            <RateView/>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(AllRatings);
