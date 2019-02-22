import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getHotelById} from '../../redux/actions/hotelActions';
import Stat from '../Account/Profile/ProfileCard/Stat/Stat';
import hotelPhoto from '../../img/hotelPhoto.jpg'

import Spinner from '../../components/ui/Spinnner/Spinner';
import './Hotel.css';
import AllRatings from './AllRatings/AllRatings';

class Hotel extends Component {
   constructor(props){
      super(props);
      this.state = {
         hotel: null
      }
   }

   componentDidMount() {
      this.props.getHotelById(this.props.match.params.id);

   }


   componentWillReceiveProps(nextProps) {
      if( nextProps.hotel.hotel) {
         this.setState({hotel: nextProps.hotel.hotel.hotel});
      }
   }


   render() {
      if (this.state.hotel !== null) {
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


                     {this.state.hotel.location?(
                        <div className="LocationBox" >
                           <p className="Location" >
                              <i className="material-icons" style={{fontSize:'16px', color:'gray'}} >&#xe55f; </i>{this.state.hotel.location}</p>
                        </div>):null}


                     {this.state.hotel.bio ?
                        (<div className="Bio">{this.state.hotel.bio}</div>):null}


                     <div className="StatHolder">
                        <Stat name="Total Ratings Done" value="13" />
                        <Stat name="Average Rating Done" value="3.7"/>
                     </div>


                  </div>

               </div>

               <div className="HotelDetails">
                  <div className= "DetailsHeader">RATINGS AND REVIEWS</div>
                  <div className="AllRatingsWrapperHotel">
                     <AllRatings
                        hotelData={this.props.hotel.hotel}
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
