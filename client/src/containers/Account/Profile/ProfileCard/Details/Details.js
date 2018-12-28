import React, {Component} from 'react';
import {connect} from 'react-redux';


/* Don't Include Bio in here*/
class Details extends Component {
   render() {
      return (
         <div className="DetailsBox">

         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(
   mapStateToProps,
)(Details);
