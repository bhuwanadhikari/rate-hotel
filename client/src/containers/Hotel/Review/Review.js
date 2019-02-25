import React, {Component} from 'react';
import './Review.css';

class Review extends Component {
    render() {
      return (
         <div className={"ReviewBox"}>
            <div className="Writer"><i className="fas far-user"> </i> A CROWAPP USER says</div>
            <div className="ReviewValue">--{this.props.reviewValue}</div>
         </div>
      );
   }
}


export default Review;
