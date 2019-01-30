import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {doRating} from '../../../redux/actions/hotelActions';

import './DoRating.css';
import Button from '../../../components/ui/Button/Button';

class DoRating extends Component {
   constructor(){
      super();
      this.state = {
         styles: {
            colors: ['silver' ,'silver' ,'silver' ,'silver' ,'silver']
         },
         isRated: false,
         rateData: {}
      };
   }


   componentDidMount() {
   }


   onDoneHandler = () => {
      console.log("Rate data: ", this.state.rateData);
      this.props.doRating(this.props.hotel.hotel.hotel._id ,this.state.rateData);
      this.props.modalClosed();
   };


   componentWillReceiveProps(nextProps) {

   }


   render() {
      const starLabels = ['Hate', 'Dislike', 'It\'s Okay', 'Like', 'Love'];
      const doRatingMain = starLabels.map((starLabel, index) => {
         return (
            <div className="StarBox" key = {starLabel}
                 onClick={() => {
                    const colorArray = [];
                    for(let i = 1; i <= 5; i++){
                       if(i <= index+1){
                          colorArray.push('var(--theme)');
                       }else {
                          colorArray.push('silver')
                       }
                    }
                    this.setState({
                       styles:{colors: colorArray},
                       isRated: true,
                       rateData:{[this.props.name]: index+1}
                    });
                 }}
            >
               <div className="Star" style = {{'color': this.state.styles.colors[index]}}> </div>
               <div className="StarLabel">{starLabel}</div>
            </div>
         );
      });


      // console.log("Data: ", this.state);

      return (
         <div className= "DoRatingBox">
            <div className="DoRatingHeader">Tap the star you want to rate</div>
            <div className="MainBox">
               {doRatingMain}
            </div>
            <div className="DoRatingButtonWrapper">
               {this.state.isRated?(<Button
                  cls = "InlineBtn Success"
                  clicked = {() => this.onDoneHandler()}
               >Done</Button>):null}
            </div>
         </div>
      );
   }
}

DoRating.propTypes = {
   doRating: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
   return {
      auth: state.auth,
      hotel: state.hotel
   };
}

export default connect(mapStateToProps, {doRating})(DoRating);
