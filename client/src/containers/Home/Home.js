import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {releaseHotelId} from '../../redux/actions/hotelActions'

class Home extends Component {
   constructor(props){
      super(props);


if(this.props.hotel.holdHotelId){
   const tempHotelId = this.props.hotel.holdHotelId;
   this.props.releaseHotelId();
   this.props.history.push(`./hotel/${tempHotelId}`)
}

   }
   render() {
      return (
         <div>
            Home
         </div>
      );
   }
}

Home.propTypes = {
  hotel: PropTypes.object.isRequired,
  releaseHotelId: PropTypes.func.isRequired
};


function mapStateToProps(state) {
   return {
      hotel: state.hotel
   };
}

export default connect(mapStateToProps, {releaseHotelId})(withRouter(Home));
