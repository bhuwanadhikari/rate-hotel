import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import './Home.css';

import Spinner from '../../components/ui/Spinnner/Spinner';
import ItemComponent from './ItemComponent/ItemComponent'

import {releaseHotelId, getHomeObject} from '../../redux/actions/hotelActions'

class Home extends Component {
   constructor(props){
      super(props);
      if(this.props.hotel.holdHotelId){
         const tempHotelId = this.props.hotel.holdHotelId;
         this.props.releaseHotelId();
         this.props.history.push(`./hotel/${tempHotelId}`)
      }

      this.state = {
         homeObject: null,
      }

   }


   componentDidMount() {
      this.props.getHomeObject();
   }


   componentWillReceiveProps(nextProps) {
      if(nextProps.hotel.homeObject){
         this.setState({homeObject: nextProps.hotel.homeObject});
      }
   }


   render() {

      console.log(this.state.homeObject);
      if(this.state.homeObject !== null || undefined) {
         let quadrupedArray = ['TEA','LUNCH','MEAL','COST','CLEANLINESS','OVERALL'];
         return (
            <div className="HomeBox">
               {Object.keys(this.state.homeObject).map((quadruped, index) => {
                     return <ItemComponent
                        key = {index}
                        quadruped = {this.state.homeObject[quadruped]}
                        label = {quadrupedArray[index]}
                     />
                  })}
            </div>
         );
      } else {
         return (<Spinner/>);
      }
   }
}

Home.propTypes = {
   hotel: PropTypes.object.isRequired,
   releaseHotelId: PropTypes.func.isRequired,
   getHomeObject: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
   return {
      hotel: state.hotel
   };
}

export default connect(mapStateToProps, {releaseHotelId, getHomeObject})(withRouter(Home));
