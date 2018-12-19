import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AlertRegistration.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideRegModal } from '../../../redux/actions/authActions'

class Modal  extends Component{


   onClickHandler = (e) => {
      e.preventDefault();
      this.props.hideRegModal();
   };

   render(){
         if(this.props.alertReg.name){
            return(
               <div className="Modal">
                  Hello {this.props.alertReg.name}! You are registered as a new User of CrowApp.
                  <button className="ModalBtn" onClick= {this.onClickHandler}>Continue to Login</button>
               </div>
            )
         }else{
            return null;
         }
   }
}

Modal.propTypes = {
   hideRegModal: propTypes.func.isRequired,
   alertReg: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   alertReg: state.alertReg
});

export default connect(mapStateToProps, {hideRegModal})(withRouter(Modal));