import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getHotelById} from '../../../redux/actions/hotelActions';
import {convertRates} from '../../../helpers/helperFunctions'

import RateOnly from '../RateView/RateOnly/RateOnly';
import Button from '../../../components/ui/Button/Button';
import RateView from '../RateView/RateView';
import './AllRatings.css';



class AllRatings extends Component {
   constructor(props){
      super(props);
      this.state = {
         expandMeal: false,
         transformValue: 0,
         mealCss: {}
      };

   }

   averageOfAll = 0;
   componentDidMount() {
      this.props.updateHotelProfileRate(this.averageOfAll);

   }

   componentDidUpdate(){
      this.props.updateHotelProfileRate(this.averageOfAll);

   }

   onMoreDetailsHandler = () => {
      this.setState({
         expandMeal: !this.state.expandMeal,
         mealCss: {
            height: !this.state.expandMeal?'650px':0
         }
      });


   };





   render() {
      const ratingLabels = ["Dal","Rice","Curry","Chutney","Salad","Side Dish","Lunch","Tea","Value of Money","Variability of Items","Comfortability","Cleanliness","Serving","Freshness"];

      const rates = this.props.hotelData.rates;
      const usefulRates = convertRates(rates, this.props.auth.user.id);


      let mealTotalValue = 0, mealTotalFrequency = 0;
      let allTotalValue = 0, allTotalFrequency = 0;

      const MealRatings = Object.keys(usefulRates).map((item, index) => {

         if(usefulRates[item].frequency>0) {
            allTotalValue += usefulRates[item].rateValue;
         }
         allTotalFrequency += usefulRates[item].frequency;

         //calculate only for meal
         if(index <= 5) {
            if(usefulRates[item].frequency>0) {
               mealTotalValue += usefulRates[item].rateValue;
            }
            mealTotalFrequency += usefulRates[item].frequency;
            return (
               <div className="RateViewWrapper" key={index}>
                  <RateView
                     data={usefulRates[item]}
                     label={ratingLabels[index]}
                     name={item}
                     extraClass="MealRateView"
                  />
               </div>
            )
         }
         return null;
      });
      this.averageOfAll = (allTotalValue/allTotalFrequency).toFixed(1);

      const OtherRatings = Object.keys(usefulRates).map((item, index) => {
         if(index > 5 && index <= 12) {
            return (
               <div className="RateViewWrapper" key={index}>
                  <RateView data={usefulRates[item]} label={ratingLabels[index]} name={item}/></div>
            );
         }
         return null;

      });




      return (
         <div className= "AllRatingsBox">

            <div className="MealRatingsBox">

               <div className="MealItemBox">
                  <div className="RateViewBox MealHeaderViewBox">
                     <div className="RateViewHeader">
                        <div className="RateName">Meal</div>
                        <div className="noOfRatings">({mealTotalFrequency} Rating References)</div>
                     </div>

                     <div className="RateViewFooter">
                        <div className="RateOnlyWrapper">
                           <RateOnly averageRating={mealTotalFrequency>0?(mealTotalValue/mealTotalFrequency).toFixed(1):0}/>
                        </div>
                        <div className="ButtonWrapper">
                           <Button
                              cls="Success InlineBtn Smaller"
                              clicked={this.onMoreDetailsHandler}
                           >{this.state.expandMeal?`Less Details`:`More Details`}</Button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="MealRatingsMain" style={this.state.mealCss}>{MealRatings}</div>

            </div>
            <div className="OtherRatingsBox" >
               {OtherRatings}
            </div>

         </div>
      );
   }
}


//kashdk
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
