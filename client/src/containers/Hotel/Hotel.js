import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getHotelById} from '../../redux/actions/hotelActions';

import Spinner from '../../components/ui/Spinnner/Spinner';
import './Hotel.css';
import AllRatings from './AllRatings/AllRatings';

class Hotel extends Component {

   componentDidMount() {
      this.props.getHotelById(this.props.match.params.id);

   }


   componentWillReceiveProps(nextProps) {

      // console.log("received props: ",nextProps.hotel.hotel);
   }


   render() {
      if (this.props.hotel.loading === 1) {
         return (
            <div className="HotelBox">
               <div className="HotelCard">This is hotel card </div>
               <div className="HotelDetails">
                  <div className= "DetailsHeader">RATINGS AND REVIEWS</div>
                  <AllRatings
                     hotelData={this.props.hotel.hotel}
                  />
                  <div className= "AllReviewsBox"> All Reviews Here</div>
               </div>
            </div>
         );
      } else {
         return (<Spinner/>);
      }
   }
}

Hotel.propTypes = {
   hotel: PropTypes.object.isRequired,
   getHotelById: PropTypes.func.isRequired
};


function mapStateToProps(state) {
   return {
      hotel: state.hotel
   };
}

export default connect(mapStateToProps, {getHotelById})(Hotel);
