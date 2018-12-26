import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import RecommendedHotels from './RecommendedHotels/RecommendedHotels';
import TopRatedHotels from './TopRatedHotels/TopRatedHotels';
import NewestHotels from './NewestHotels/NewestHotels';
import Auxi from '../../hoc/Auxi';
import './Hotels.css';


class Hotels extends React.Component {

   componentDidMount() {
      //Redirect to /hotels/recommended when Hotels component is mounted
      this.props.history.push('/hotels/recommended');
   }

   render() {
      return (
         <Auxi>
            <div className="HotelsNavSec">

               <NavLink
                  className="HotelsLink Recommended"
                  activeClassName="ActiveHotelsLink"
                  to="/hotels/recommended"
               >
                  Recommended
               </NavLink>

               <NavLink
                  className="HotelsLink TopRated"
                  activeClassName="ActiveHotelsLink"
                  to="/hotels/top-rated"
               >
                  Top Rated
               </NavLink>

               <NavLink
                  className="HotelsLink Newest"
                  activeClassName="ActiveHotelsLink"
                  to="/hotels/newest"
               >
                  Newest
               </NavLink>

            </div>

            <Route exact path='/hotels/recommended' component={RecommendedHotels}/>
            <Route exact path='/hotels/top-rated' component={TopRatedHotels}/>
            <Route exact path='/hotels/newest' component={NewestHotels}/>
         </Auxi>
      )
   }
};


export default Hotels;



