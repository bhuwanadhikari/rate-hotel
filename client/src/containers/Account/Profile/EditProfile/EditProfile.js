import React, {Component} from 'react';
import {connect} from 'react-redux';

class EditProfile extends Component {
   render() {
      return (
         <div>
            Edit Profile
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(
   mapStateToProps,
)(EditProfile);
