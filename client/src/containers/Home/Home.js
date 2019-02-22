import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import ItemComponent from './ItemComponent/ItemComponent'

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
            <ItemComponent/>
            Top rated by tea box <br/>
            Top rated by lunch box <br/>
            Top rated by meal box <br/>
            Top rated by value of money box <br/>
            Top rated overall box <br/>
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
