import React, {Component} from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';

import imag from '../../img/backImages/hotelBackgroung.jpg';
import './AllHotels.css';
import Button from '../ui/Button/Button';
import Spinnner from '../ui/Spinnner/Spinner';
import RateOnly from '../../containers/Hotel/RateView/RateOnly/RateOnly';

import {getAllHotels} from '../../redux/actions/hotelActions'

class AllHotels extends Component {

   constructor(){
      super();
      this.state = {
         allHotels: null
      };
   }

   onRateClickHandler = (e) => {
      this.props.history.push(`/hotel/${e.target.dataset.message}`)
   };


   componentDidMount() {
      this.props.getAllHotels();
   }

   componentWillReceiveProps(nextProps) {
      const newAllHotels = nextProps.hotel.allHotels;
      this.setState({allHotels: newAllHotels});
   }


   render() {

      if(this.props.hotel.allHotels !== null ) {
         const allHotelView = this.props.hotel.allHotels.map(hotel => {
            const averageRating = hotel.averageRating;

            return (
               <div className="SmallHotelCardBox" key = {hotel._id}>
                  <div className="ImageBox">
                     <img src={imag} alt="Thumbnail for Hotel"/>
                  </div>
                  <div className="DetailBox">
                     <h5 className="HotelName">
                        <NavLink className = "HotelLink" to = {`hotel/${hotel._id}`}>
                           {hotel.name?hotel.name:null}
                        </NavLink>
                     </h5>
                     {hotel.location?(
                        <div className="HotelLocation">{hotel.location}</div>
                     ):(<div className="HotelLocation">Pokhara Nepal</div>)}

                     {<RateOnly averageRating = {averageRating}/>}


                     <div className="HotelCardFooter">
                        <div className="ReviewNumber">{hotel.reviews} reviews</div>

                        <Button
                           cls = "Success InlineBtn Smaller"
                           dataMessage = {hotel._id}
                           clicked = {this.onRateClickHandler}
                        >
                           Rate Me!
                        </Button>
                     </div>
                  </div>
               </div>
            )
         });
         return (
            <div className="AllHotelsBox">
               {allHotelView}
            </div>
         )
      }


      return (<Spinnner/>);
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
