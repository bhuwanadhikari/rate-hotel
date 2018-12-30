import React, {Component} from 'react';
import {connect} from 'react-redux';

class SettingsAndPrivacy extends Component {
   render() {
      return (
         <div>
            Settings and Privacy
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(
   mapStateToProps,
)(SettingsAndPrivacy);
