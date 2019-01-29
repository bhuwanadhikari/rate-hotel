import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getHotelById} from '../../../redux/actions/hotelActions';
import {convertRates} from '../../../helpers/helperFunctions'

import RateView from '../RateView/RateView';
import './AllRatings.css';
import profileReducer from "../../../redux/reducers/profileReducer";

class AllRatings extends Component {


   componentDidMount() {
      // console.log(this.props.hotelData);
   }

   /*chutney: Array []
comfortability: Array []
curry: Array []
dal: Array []
expensiveness: Array []
freshness: Array []
hygiene: Array []
lunch: Array []
rice: Array []
salad: Array []
serving: Array []
sideDish: Array []
tea: Array []
vif: Array []
*/




   render() {
      const ratingLabels = ["Dal","Rice","Curry","Chutney","Salad","Side Dish","Lunch","Tea","Value of Money","Variability of Items","Comfortability","Cleanliness","Serving","Freshness"];

      const rates = this.props.hotelData.rates;
      const usefulRates = convertRates(rates, this.props.auth.user.id);
      // console.log("Output Useful Rate: ",usefulRates);
      const AllRatingsMain = Object.keys(usefulRates).map((item, index) => {
         return(
            <div className="RateViewWrapper" key = {index}>
               <RateView data = {usefulRates[item]} label={ratingLabels[index]} name={item} /></div>
         )
      });
      return (
         <div className= "AllRatingsBox">

            <div className="MealBox"> </div>
            <div className="OtherRatingBox">
               {AllRatingsMain}
            </div>
         </div>
      );
   }
}

AllRatings.propTypes = {
   getHotelById: PropTypes.func.isRequired,
   hotel: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
   return {
      hotel: state.hotel,
      auth: state.auth
   };
}

export default connect(mapStateToProps, {getHotelById})(AllRatings);
