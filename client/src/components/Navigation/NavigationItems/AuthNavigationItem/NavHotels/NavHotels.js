import React, { Component } from 'react';
import './NavHotels.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import hotelIcon from '../../../../../img/navImg/hotels.svg';

class NavHotels extends Component{
   constructor() {
      super();
      this.state = {
         showDrop: false
      };
   }

   onClickHandler = (e) => {
      e.preventDefault();
      this.setState({showDrop: !this.state.showDrop});
      console.log(this.state.showDrop);
   };
   render() {
      return (
         <li className="AuthNavigationItem HotelsNav" onClick={this.onClickHandler}>

            <NavLink className="AuthNavLink"  activeClassName = "ActiveLink" to={this.props.link}>
            <img className="AuthNavIcon" src={hotelIcon} alt="Hotel Icon of CrowApp"/>
            </NavLink>
         </li>
      )

   }
}


export default NavHotels;

{/*
<div className="DropHotels">
   <ul>
      <li>
         <NavLink className="DropHotelsLink" to="/hotels/recommended">Recommended</NavLink></li>
      <li>               <NavLink className="DropHotelsLink" to="/hotels/rated">Top Rated</NavLink>
      </li>
      <li>               <NavLink className="DropHotelsLink" to="/hotels/newest">Newest</NavLink>
      </li>
   </ul>
</div>*/}
