import React, {Component} from 'react';
import {connect} from 'react-redux';

class ActivityCard extends Component {
   render() {
      return (
         <div>
            ActivityCard
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(
   mapStateToProps,
)(ActivityCard);
