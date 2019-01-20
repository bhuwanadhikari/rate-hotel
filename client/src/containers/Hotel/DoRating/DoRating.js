import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DoRating.css';
import index from "../../../redux/reducers";

import Button from '../../../components/ui/Button/Button';

class DoRating extends Component {
   constructor(){
      super();
      this.state = {
         styles: {
            colors: ['silver' ,'silver' ,'silver' ,'silver' ,'silver']
         },
         isRated: false,
         dataValue: null
      };
   }

   onDoneHandler = (e) => {
      e.preventDefault();
      console.log("done");
   };

   render() {
      const starLabel = ['Hate', 'Dislike', 'It\'s Okay', 'Like', 'Love'];
      const doRatingMain = starLabel.map((label) => {
         return (
            <div className="StarBox" key = {label}
                 onClick={() => {
                    const colorArray = [];
                    for(let i = 1; i <= 5; i++){
                       if(i <= starLabel.indexOf(label)+1){
                          colorArray.push('var(--theme)');
                       }else {
                          colorArray.push('silver')
                       }
                    }
                    this.setState({
                       styles:{colors: colorArray},
                       isRated: true,
                       dataValue: starLabel.indexOf(label)+1
                    });
                 }}
            >
               <div className="Star" style = {{'color': this.state.styles.colors[starLabel.indexOf(label)]}}> </div>
               <div className="StarLabel">{label}</div>
            </div>
         );
      });


      console.log("Data: ", this.state);

      return (
         <div className= "DoRatingBox">
            <div className="DoRatingHeader">Tap the star you want to rate for</div>
            <div className="MainBox">
               {doRatingMain}
            </div>
            <div className="DoRatingButtonWrapper">
               {this.state.isRated?(<Button
                  cls = "InlineBtn Success"
                  clicked = {this.onDoneHandler}
               >Done</Button>):null}
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(DoRating);
