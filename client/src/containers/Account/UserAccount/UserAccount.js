import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserAccount extends Component {
   render() {
      return (
         <div>
            UserAccount
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(
   mapStateToProps,
)(UserAccount);
