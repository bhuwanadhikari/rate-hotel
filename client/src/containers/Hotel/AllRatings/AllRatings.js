import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getHotelById} from '../../../redux/actions/hotelActions';
import {convertRates} from '../../../helpers/helperFunctions'

import RateOnly from '../RateView/RateOnly/RateOnly';
import Button from '../../../components/ui/Button/Button';
import RateView from '../RateView/RateView';
import './AllRatings.css';
import profileReducer from "../../../redux/reducers/profileReducer";

class AllRatings extends Component {
   constructor(props){
      super(props);
      this.state = {
         expandMeal: false,
         transformValue: 0
      };
   }

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
   onMoreDetailsHandler = () => {
      this.setState({expandMeal: !this.state.expandMeal});

   };



   render() {
      const ratingLabels = ["Dal","Rice","Curry","Chutney","Salad","Side Dish","Lunch","Tea","Value of Money","Variability of Items","Comfortability","Cleanliness","Serving","Freshness"];

      const rates = this.props.hotelData.rates;
      const usefulRates = convertRates(rates, this.props.auth.user.id);
      // console.log("Output Useful Rate: ",usefulRates);

      let mealAverageRating = 0;
      const MealRatings = Object.keys(usefulRates).map((item, index) => {
         if(index <= 5) {
            mealAverageRating = (usefulRates[item].rateValue/usefulRates[item].frequency+ mealAverageRating)/2;
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
      });

      const OtherRatings = Object.keys(usefulRates).map((item, index) => {
         if(index > 5) {
            return (
               <div className="RateViewWrapper" key={index}>
                  <RateView data={usefulRates[item]} label={ratingLabels[index]} name={item}/></div>
            )
         }
      });


      return (
         <div className= "AllRatingsBox">

            <div className="MealRatingsBox">

               <div className="MealItemBox">
                  <div className="RateViewBox MealRateViewBox">
                     <div className="RateViewHeader">
                        <div className="RateName">Meal</div>
                        <div className="noOfRatings">(322 Rating References)</div>
                     </div>

                     <div className="RateViewFooter">
                        <div className="RateOnlyWrapper">
                           <RateOnly averageRating={mealAverageRating.toFixed(1)}/>
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

               {this.state.expandMeal
                  ?(<div className="MealRatingsMain" style={{transform: `translateX(${this.state.transformValue}px)`}}>{MealRatings}</div>)
                  :null}

            </div>
            <div className="OtherRatingsBox" >
               {OtherRatings}
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
