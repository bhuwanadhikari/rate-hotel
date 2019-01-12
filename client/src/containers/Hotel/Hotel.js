import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getHotelById} from '../../redux/actions/hotelActions';
import Spinner from '../../components/ui/Spinnner/Spinner';

class Hotel extends Component {

   componentDidMount() {
      this.props.getHotelById(this.props.match.params.id);
   }


   componentWillReceiveProps(nextProps) {
      // console.log(nextProps.hotel.hotel);
   }


   render() {
      if (this.props.hotel.loading) {
         return <Spinner/>;
      } else {
         return (
            <div>loadieed</div>
         );
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
