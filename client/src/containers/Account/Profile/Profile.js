import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../../redux/actions/profileActions';

class Profile extends Component {
   constructor(props){
      super(props);
      this.state = {};
   }

   componentDidMount(){
      getCurrentProfile();
   }

   render() {
      return (
         <div>
            This is profile
         </div>
      );
   }
}


Profile.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};

function mapStateToProps(state) {
   return {
      profile: state.profile
   };
}



export default connect(mapStateToProps,{ getCurrentProfile})(Profile);
