import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {getHotelById} from '../../redux/actions/hotelActions';
import hotelPhoto from '../../img/hotelPhoto.jpg'

import Spinner from '../../components/ui/Spinnner/Spinner';
import './Hotel.css';
import AllRatings from './AllRatings/AllRatings';
import Review from './Review/Review';
import Modal from '../../components/ui/Modal/Modal';
import Button from '../../components/ui/Button/Button';
import RateOnly from './RateView/RateOnly/RateOnly';

class Hotel extends Component {
   constructor(props){
      super(props);
      this.state = {
         hotel: null,
         averageOfAll: 0,
         showReviewForm: false,
         reviewText: "",
         reviewArray: null,
         errors: {}
      }
   };

   componentDidMount() {
      this.props.getHotelById(this.props.match.params.id);

   }

   componentWillReceiveProps(nextProps) {
      if( nextProps.hotel.hotel) {
         this.setState({hotel: nextProps.hotel.hotel.hotel});
         this.setState({reviewArray: nextProps.hotel.hotel.reviews});
      }
   }

   onWriteHandler = () => {
      this.setState({showReviewForm: !this.state.showReviewForm});
   };

   onSubmitHandler = (text) => {
      if(text.length>2) {
         axios.post(`/api/hotels/review/${this.state.hotel._id}`, {review: text})
            .then((res) => {
                  this.setState({reviewArray: res.data.reviews});
                  // console.log(res.data.reviews);

               }
            ).catch((e) => {
               alert("Something went wrong");
         });
      }
      this.setState({showReviewForm: !this.state.showReviewForm});
   };
   updateHotelProfileRate = (value) => {
      this.setState({averageOfAll: value});
   };

   render() {

      // console.log(this.state.reviewArray);
      if ((this.state.hotel !== null)) {


         return (
            <div className="HotelBox">
               <div className="HotelCard">

                  <div className="HotelProfileCard">

                     <div className="HotelAvatarHolder">
                        <div className="HotelAvatar">
                           <img className="HotelImageClass" src={hotelPhoto} alt="Avatar for user profile"/>
                        </div>
                     </div>


                     <div className="Intro">{this.state.hotel.name}</div>

                     <div className="StatHolderWrap">
                        <div className="StatHolderHotel">
                           <RateOnly averageRating={this.state.averageOfAll}/>
                        </div>
                     </div>


                     {this.state.hotel.location?(
                        <div className="LocationBox LocationBoxHotel" >
                           <p className="Location" >
                              <i className="material-icons" style={{fontSize:'16px', color:'gray'}} >&#xe55f; </i>{this.state.hotel.location}</p>
                        </div>):null}


                     {this.state.hotel.bio ?
                        (<div className="Bio">{this.state.hotel.bio}</div>):null}
                  </div>

               </div>

               <div className="HotelDetails">
                  <div className= "DetailsHeader">RATINGS</div>
                  <div className="AllRatingsWrapperHotel">
                     <AllRatings
                        hotelData={this.props.hotel.hotel}
                        updateHotelProfileRate = {this.updateHotelProfileRate}
                        averageOfAll = {this.state.averageOfAll}
                     />
                  </div>
                  <div className= "AllReviewsWrapper">
                     <div className="ReviewsHeader">REVIEWS</div>
                     <div className="ShowForm" onClick={this.onWriteHandler}>
                        Write a review +
                     </div>
                     {this.state.showReviewForm
                        ?(
                           <Modal
                              show={this.state.showReviewForm}
                              modalClosed={() => {
                                 this.setState({showReviewForm: false});
                              }}
                              fromTop = '35%'
                           >
                              <div className="AlertMessage">
                                 <b>Write a review</b>
                              </div>
                              <div className={"TextAreaWrapper"}>
                                 <textarea
                                    autoFocus={true}
                                    rows={3}
                                    cols={30}
                                    className={"ReviewInput"}
                                    value={this.state.reviewText}
                                    onChange={(e) => {this.setState({reviewText:e.target.value})}}
                                 />
                              </div>
                              <Button
                                 cls = "Success InlineBtn"
                                 clicked = {() => {
                                    this.setState({show: false});
                                    this.onSubmitHandler(this.state.reviewText);
                                 }}
                              >Submit</Button>
                           </Modal>
                        )
                        :null
                     }

                     {this.state.reviewArray.length>0
                        ?(this.state.reviewArray.map((review, index) =>{
                           return (
                              <Review
                                 key ={index}
                                 reviewValue = {review.review}
                              />
                           )
                        }))
                        :(<div style={{
                           fontFamily:'Poppins, Sans-Serif',
                           fontSize:'0.9em',
                           textAlign: 'center'
                        }}>No Reviews Yet</div>)
                     }
                  </div>
               </div>
            </div>
         );
      } else {
         return (<Spinner/>);
      }
   }
}

Hotel.propTypes = {
   hotel: PropTypes.object.isRequired,
   getHotelById: PropTypes.func.isRequired
};


function mapStateToProps(state) {
   return {
      hotel: state.hotel
   };
}

export default connect(mapStateToProps, {getHotelById})(Hotel);
