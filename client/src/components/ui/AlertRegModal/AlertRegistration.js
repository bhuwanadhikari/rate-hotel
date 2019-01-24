import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AlertRegistration.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideRegModal } from '../../../redux/actions/authActions';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

class RegModal  extends Component{


   onClickHandler = (e) => {
      e.preventDefault();
      this.props.hideRegModal();
   };

   render(){
      if(this.props.alertReg.name){
         return(

               <Modal show={true} modalClosed={this.onClickHandler} fromTop = '35%'>
                  <div className="AlertMessage">
                     Hello, {this.props.alertReg.name} ! You are registered as a new User of CrowApp.
                  </div>
                  <Button
                     cls = "Success InlineBtn"
                     clicked = {this.onClickHandler}

                  >Continue to Login</Button>
               </Modal>







         )
      }else{
         return null;
      }
   }
}

RegModal.propTypes = {
   hideRegModal: propTypes.func.isRequired,
   alertReg: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   alertReg: state.alertReg
});

export default connect(mapStateToProps, {hideRegModal})(withRouter(RegModal));