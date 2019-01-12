import React, {Component} from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';

import imag from '../../img/backImages/hotelBackgroung.jpg';
import './AllHotels.css';
import Button from '../ui/Button/Button';
import Spinnner from '../ui/Spinnner/Spinner';

import {getAllHotels} from '../../redux/actions/hotelActions'

class AllHotels extends Component {

   constructor(){
      super();
      this.state = {
         allHotels: null
      };
   }

   onRateClickHandler = (e) => {
      this.props.history.push(`/hotel/${e.target.dataset.message}`)
   };


   componentDidMount() {
      this.props.getAllHotels();
   }

   componentWillReceiveProps(nextProps) {
      const newAllHotels = nextProps.hotel.allHotels;
      this.setState({allHotels: newAllHotels});
   }


   render() {

      if(this.props.hotel.allHotels !== null ) {
         const allHotelView = this.props.hotel.allHotels.map(hotel => {
            const averageRating = hotel.averageRating;
            const avgRateArr = [];
            if(averageRating>=1) {
               let mode = (Math.floor(averageRating))%5;
               console.log("mode 1: ", mode);
               for (let i = 1; i <= mode; i++) {
                  avgRateArr.push(10);
               }

               let mode2 = Math.ceil((averageRating*10)%10);
               console.log("mode 2: ", mode2);
               for(let i = mode+1; i <= 5; i++){
                  if(i === mode+1){
                     avgRateArr.push(mode2);
                  }else {
                     avgRateArr.push(0);
                  }
               }

            }else {

               avgRateArr.push(averageRating*10, 0, 0, 0, 0);
            }

            console.log(avgRateArr);
            const rateElementBasicStyles = {
               position: 'relative',
            zIndex: 3,
            top: 0,
            left: 0,
            display: 'block',
            height: '10px',
            backgroundColor: 'green'};

            const styles = {
               one:{...rateElementBasicStyles, width:avgRateArr[0]},
               two:{...rateElementBasicStyles, width:avgRateArr[1]},
               three:{...rateElementBasicStyles, width:avgRateArr[2]},
               four:{...rateElementBasicStyles, width:avgRateArr[3]},
               five:{...rateElementBasicStyles, width:avgRateArr[4]}
            };
            return (
               <div className="SmallHotelCardBox" key = {hotel._id}>
                  <div className="ImageBox">
                     <img src={imag} alt="Thumbnail for Hotel"/>
                  </div>
                  <div className="DetailBox">
                     <h5 className="HotelName">
                        <NavLink className = "HotelLink" to = {`hotel/${hotel._id}`}>
                           {hotel.name?hotel.name:null}
                        </NavLink>
                     </h5>
                     {hotel.location?(
                        <div className="HotelLocation">{hotel.location}</div>
                     ):(<div className="HotelLocation">Pokhara Nepal</div>)
                     }
                     <div className="RateContainer">
                        <div className="RateBox">
                           <div className="RateSpan" ><div className="RateField"><div className="RateElement" style = {styles.one}> </div> </div></div>
                           <div className="RateSpan"><div className="RateField"><div className="RateElement" style = {styles.two}> </div> </div></div>
                           <div className="RateSpan"><div className="RateField"><div className="RateElement" style = {styles.three}> </div> </div></div>
                           <div className="RateSpan"><div className="RateField"><div className="RateElement" style = {styles.four}> </div> </div></div>
                           <div className="RateSpan"><div className="RateField"><div className="RateElement" style = {styles.five}> </div> </div></div>
                        </div>
                        <div className="AvgRatingBox"><div className="AvgRating">{hotel.averageRating}</div></div>
                     </div>
                     <div className="HotelCardFooter">
                        <div className="ReviewNumber">{hotel.reviews} reviews</div>

                        <Button
                           cls = "Success InlineBtn Smaller"
                           dataMessage = {hotel._id}
                           clicked = {this.onRateClickHandler}
                        >
                           Rate Me!
                        </Button>
                     </div>
                  </div>
               </div>
            )
         });
         return (
            <div className="AllHotelsBox">
               {allHotelView}
            </div>
         )
      }


      return (<Spinnner/>);
   }
}

AllHotels.propTypes = {
   hotel: PropTypes.object.isRequired,
   getAllHotels: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
   hotel: state.hotel
});


export default connect(mapStateToProps, {getAllHotels})(withRouter(AllHotels));
