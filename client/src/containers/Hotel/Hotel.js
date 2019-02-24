import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getHotelById} from '../../redux/actions/hotelActions';
import hotelPhoto from '../../img/hotelPhoto.jpg'

import Spinner from '../../components/ui/Spinnner/Spinner';
import './Hotel.css';
import AllRatings from './AllRatings/AllRatings';
import RateOnly from './RateView/RateOnly/RateOnly';

class Hotel extends Component {
   constructor(props){
      super(props);
      this.state = {
         hotel: null,
         averageOfAll: 0
      }
   };

   componentDidMount() {
      this.props.getHotelById(this.props.match.params.id);

   }

   componentWillReceiveProps(nextProps) {
      if( nextProps.hotel.hotel) {
         this.setState({hotel: nextProps.hotel.hotel.hotel});
      }
   }

   updateHotelProfileRate = (value) => {
      this.setState({averageOfAll: value});
   };

   render() {

      // console.log(this.state.hotel);
      if ((this.state.hotel !== null)) {


         return (
            <div className="HotelBox">
               <div className="HotelCard">

                  <div className="HotelProfileCard">

                     <div className="HotelAvatarHolder">
                        <div className="HotelAvatar">
                           <img className="HotelImageClass" src={hotelPhoto} alt="Avatar for user profile"/>
                        </div>
                     </div>


                     <div className="Intro">{this.state.hotel.name}</div>

                     <div className="StatHolderWrap">
                        <div className="StatHolderHotel">
                           <RateOnly averageRating={this.state.averageOfAll}/>
                        </div>
                     </div>


                     {this.state.hotel.location?(
                        <div className="LocationBox LocationBoxHotel" >
                           <p className="Location" >
                              <i className="material-icons" style={{fontSize:'16px', color:'gray'}} >&#xe55f; </i>{this.state.hotel.location}</p>
                        </div>):null}


                     {this.state.hotel.bio ?
                        (<div className="Bio">{this.state.hotel.bio}</div>):null}
                  </div>

               </div>

               <div className="HotelDetails">
                  <div className= "DetailsHeader">RATINGS AND REVIEWS</div>
                  <div className="AllRatingsWrapperHotel">
                     <AllRatings
                        hotelData={this.props.hotel.hotel}
                        updateHotelProfileRate = {this.updateHotelProfileRate}
                        averageOfAll = {this.state.averageOfAll}
                     />
                  </div>
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
