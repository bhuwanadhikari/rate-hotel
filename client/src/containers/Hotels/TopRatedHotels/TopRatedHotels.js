import React, {Component} from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';

import imag from '../../../img/backImages/hotelBackgroung.jpg';
import '../../../components/AllHotels/AllHotels.css';
import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinnner/Spinner';
import RateOnly from '../../Hotel/RateView/RateOnly/RateOnly';
import Modal from '../../../components/ui/Modal/Modal';

import {getAllHotels, holdHotelId, releaseHotelId, getTopRatedHotels} from '../../../redux/actions/hotelActions';

class AllHotels extends Component {

   constructor(){
      super();
      this.state = {
         allHotels: null,
         showModal: false,
         topRatedHotels: null,

      };
   }

   onRateClickHandler = (e) => {
      if(this.props.auth.isAuthenticated){
         this.props.history.push(`/hotel/${e.target.dataset.message}`);
      }else {
         this.setState({showModal: true});
         this.props.holdHotelId(e.target.dataset.message);
         console.log(e.target.dataset.message);
      }
   };


   componentDidMount() {
      this.props.getTopRatedHotels();

      // this.props.holdHotelId(35);
   }

   componentWillReceiveProps(nextProps) {
      if(nextProps.hotel.topRatedHotels) {
         const newAllHotels = nextProps.hotel.topRatedHotels;

         this.setState({topRatedHotels: newAllHotels});
      }
   }


   render() {
      if(this.props.hotel.topRatedHotels !== null ) { //or check the loading state to be 11
         const allHotelView = this.props.hotel.topRatedHotels.map(hotel => {
            const averageRating = hotel.averageRating;

            return (
               <div className="SmallHotelCardBox" key={hotel._id}>
                  <div className="ImageBox">
                     <img src={imag} alt="Thumbnail for Hotel"/>
                  </div>
                  <div className="DetailBox">
                     <h5 className="HotelName">
                        <NavLink className="HotelLink" exact to={`/hotel/${hotel._id}`}

                        >
                           {hotel.name ? hotel.name : null}
                        </NavLink>
                     </h5>
                     {hotel.location ? (
                        <div className="HotelLocation">{hotel.location}</div>
                     ) : (<div className="HotelLocation">Pokhara Nepal</div>)}

                     <div className="RateOnlyWrapper">
                        <RateOnly averageRating={averageRating}/>
                     </div>

                     <div className="HotelCardFooter">
                        <div className="ReviewNumber">{hotel.reviews} ratings</div>
                        <div className="ButtonWrapper">
                           <Button
                              cls="Success InlineBtn Smaller"
                              dataMessage={hotel._id}
                              clicked={this.onRateClickHandler}
                           >
                              Rate Me!
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>)
         });
         return (
            <div className="AllHotelsBox">

               <Modal show={this.state.showModal} modalClosed={() => {
                  this.setState({showModal: false});
                  this.props.releaseHotelId();

               }} fromTop = '35%'>
                  <div className="AlertMessage">You have to Login to access Hotel Profiles</div>
                  <Button
                     cls = "Success InlineBtn"
                     clicked = {() => {
                        this.setState({showModal: false});
                        this.props.history.push('/login');
                     }}
                  >Continue to Login</Button>
               </Modal>

               {allHotelView}

            </div>
         )
      }


      return (<Spinner/>);
   }
}

AllHotels.propTypes = {
   hotel: PropTypes.object.isRequired,
   getAllHotels: PropTypes.func.isRequired,
   holdHotelId: PropTypes.func.isRequired,
   releaseHotelId: PropTypes.func.isRequired,
   getTopRatedHotels: PropTypes.func.isRequired,

};


const mapStateToProps = (state) => ({
   hotel: state.hotel,
   auth: state.auth
});


export default connect(mapStateToProps, {getAllHotels, holdHotelId, releaseHotelId, getTopRatedHotels})(withRouter(AllHotels));
