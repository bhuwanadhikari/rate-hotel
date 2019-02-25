import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';
import imag from '../../../img/backImages/hotelBackgroung.jpg';
import Button from '../../../components/ui/Button/Button';
import RateOnly from '../../Hotel/RateView/RateOnly/RateOnly';
import PropTypes from 'prop-types';


import './ItemComponent.css';

class ItemComponent extends Component {

   constructor(props){
      super(props);
      this.state = {
         showingMore: false,
      }
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

   onShowingMoreHandler = () => {
      this.setState({showingMore: !this.state.showingMore});
   };



   render() {

      const pedView = this.props.quadruped.map((hotel, index) => {
         return (
            <div className="SmallHotelCardBox SmallHotelCardBoxHome" key={hotel._id}>
               <div className="ImageBox">
                  <img src={imag} alt="Thumbnail for Hotel"/>
               </div>
               <div className="DetailBox">
                  <h5 className="HotelName">
                     <NavLink className="HotelLink" to={`hotel/${hotel._id}`}>
                        {hotel.name ? hotel.name : null}
                     </NavLink>
                  </h5>
                  {hotel.location ? (
                     <div className="HotelLocation">{hotel.location}</div>
                  ) : (<div className="HotelLocation">Pokhara Nepal</div>)}

                  <div className="RateOnlyWrapper">
                     <RateOnly averageRating={hotel.averageRating}/>
                  </div>

                  <div className="HotelCardFooter">
                     {console.log(`${this.props.label}Icon PedIcon`)}
                     <div className={`${this.props.label}Icon PedIcon`}> </div>
                     <div className="ButtonWrapper">
                        <Button
                           cls="Success InlineBtn Smaller"
                           dataMessage={hotel._id}
                           clicked={this.onRateClickHandler}
                        >
                           View Details
                        </Button>
                     </div>
                  </div>
               </div>
            </div>)

      });

      return (
         <div className="ICBox">
            <div className="ICWhole" style={{height: this.state.showingMore?'auto':'532px'}}>
               <div className="ICHeading">
                  TOP RATED IN {this.props.label}
               </div>

               <div className="ICMain" style={{height: this.state.showingMore?'auto':'455px'}}>
                  {pedView}
               </div>
               <div className="ViewOption" onClick = {this.onShowingMoreHandler}>
                  VIEW {this.state.showingMore?"LESS":"MORE"}
               </div>
            </div>
         </div>
      );
   }
}

ItemComponent.propTypes = {
   auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
   return {
      auth: state.auth,
   };
}

export default connect(mapStateToProps,)(withRouter(ItemComponent));
