import React from 'react';
import Button from '../../../components/ui/Button/Button';

import RateOnly from './RateOnly/RateOnly';
import DoRating from '../DoRating/DoRating';
import './RateView.css'
import Modal from '../../../components/ui/Modal/Modal';
import Auxi from '../../../hoc/Auxi';
//
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

class RateView extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         showModal: false
      };
   }

   onBackDropClickHandler = () => {
      this.setState({showModal: false});
   };

   onDoRatingHandler = (e) => {
      e.preventDefault();
      this.setState({showModal: true});
   };
   render() {

      const averageValue=
         this.props.data.frequency>0?(this.props.data.rateValue/this.props.data.frequency).toFixed(1):0;
      return (
         <Auxi>


            <Modal show={this.state.showModal} modalClosed={this.onBackDropClickHandler} fromTop = '30%'>
               <DoRating name={this.props.name} modalClosed={this.onBackDropClickHandler}/>
            </Modal>


            <div className={`RateViewBox ${this.props.extraClass}`}>


               <div className="RateViewHeader">
                  <div className="RateName">{this.props.label}</div>
                  <div className="noOfRatings">({this.props.data.frequency===1?`1 Rating`:`${this.props.data.frequency} Ratings`})</div>
               </div>

               <div className="RateViewFooter">
                  <div className="RateOnlyWrapper">
                     <RateOnly averageRating={averageValue}/>
                  </div>
                  <div className="ButtonWrapper">
                     <Button
                        cls="Success InlineBtn Smaller"
                        clicked={this.onDoRatingHandler}
                     >{this.props.data.alreadyRated
                        ?"Edit Rate"
                        :"Rate Here"}</Button>
                  </div>
               </div>


            </div>
         </Auxi>
      );
   }
}

export default RateView;