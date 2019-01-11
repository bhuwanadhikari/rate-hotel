import React, {Component} from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';

import imag from '../../img/backImages/hotelBackgroung.jpg';
import './AllHotels.css';
import Button from '../ui/Button/Button';

import {getAllHotels} from '../../redux/actions/hotelActions'

class AllHotels extends Component {

   constructor(){
      super();
      this.state = {};
   }

   onRateClickHandler = (e) => {
      this.props.history.push(`/hotel/${e.target.dataset.message}`)
   };


   componentDidMount() {
      this.props.getAllHotels();
   }


   render() {
      const HotelData = {
         _id: '5c38d67f536a9817d8d398c3',
         name: "Grinder's Coffee Hut",
         location: "Engineering Gate Lamachaur",
         rating: {

         },
         averageRating: 4.3,
         reviews: 32
      };
      const HotelCard = (

         <div className="SmallHotelCardBox">
            <div className="ImageBox">
               <img src={imag} alt="Thumbnail for Hotel"/>
            </div>
            <div className="DetailBox">
               <h5 className="HotelName">
                  <NavLink className = "HotelLink" to = {`hotel/${HotelData._id}`}>
                     {HotelData.name?HotelData.name:null}
                  </NavLink>
               </h5>
               {HotelData.location?(
                  <div className="HotelLocation">{HotelData.location}</div>
               ):null}
               <div className="RateContainer">
                  <div className="RateBox">
                     <div className="RateSpan"><div className="RateField"><div className="RateElement"> </div> </div></div>
                     <div className="RateSpan"><div className="RateField"><div className="RateElement"> </div> </div></div>
                     <div className="RateSpan"><div className="RateField"><div className="RateElement"> </div> </div></div>
                     <div className="RateSpan"><div className="RateField"><div className="RateElement"> </div> </div></div>
                     <div className="RateSpan"><div className="RateField"><div className="RateElement"> </div> </div></div>
                  </div>
                  <div className="AvgRatingBox"><div className="AvgRating">{HotelData.averageRating}</div></div>
               </div>
               <div className="HotelCardFooter">
                  <div className="ReviewNumber">{HotelData.reviews} reviews</div>

                  <Button
                     cls = "Success InlineBtn Smaller"
                     dataMessage = {HotelData._id}
                     clicked = {this.onRateClickHandler}
                  >
                     Rate this Hotel!
                  </Button>
               </div>
            </div>
         </div>

      );

      return (
         <div className="AllHotelsBox">
            {HotelCard}
            {HotelCard}
            {HotelCard}
            {HotelCard}
            {HotelCard}
         </div>
      )
   }
}

AllHotels.propTypes = {
   hotel: PropTypes.object.isRequired,
   getAllHotels: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
   hotel: state.hotel
});


export default connect(mapStateToProps, {getAllHotels})(withRouter(AllHotels));
