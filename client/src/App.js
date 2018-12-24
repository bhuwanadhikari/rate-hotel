import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.css'; //CSS for all of the apps
import Splash from './components/ui/Splash/Splash';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';

import Landing from './components/Landing/Landing';
import AllHotels from './components/AllHotels/AllHotels';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';

//Basic routes imports
import Home from './containers/Home/Home';
import Hotels from './containers/Hotels/Hotels';
// import NewestHotels from './containers/Hotels/NewestHotels/NewestHotels';
// import RecommendedHotels from './containers/Hotels/RecommendedHotels/RecommendedHotels';
// import TopRatedHotels from './containers/Hotels/TopRatedHotels/TopRatedHotels';
import Search from './containers/Search/Search';

import Account from './containers/Account/Account';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';

import PrivateRoute from './hoc/PrivateRoute';

import store from './redux/store/store';

//check for token
if(localStorage.jwtToken){
   //set auth token header auth to be used in every request
   setAuthToken(localStorage.jwtToken);
   //decode the token
   const decoded = jwt_decode(localStorage.jwtToken);
   //set user and is authenticated
   store.dispatch(setCurrentUser(decoded));
}


class App extends Component {
   state = {
      appState: (<Splash/>)
   };



   componentDidMount(){

      const updatedAppState = (
         <Provider store = {store}>
            <Router>
               <div className="App">
                  <Navigation />
                  <Switch>
                     <PrivateRoute exact path = "/" component = {Landing} history = {this.props.history} />
                     <Route exact path = "/allHotels" component = {AllHotels} />
                     <Route exact path = "/signup" component = {SignUp} />
                     <Route exact path = "/login" component = {Login} />
                  </Switch>
                  <Switch>
                     <PrivateRoute exact path = "/home" component = {Home} />
                     <PrivateRoute  path = "/hotels" component = {Hotels} />
                     {/*<Route exact path = "/hotels/top-rated" component = {TopRatedHotels} />*/}
                     {/*<Route exact path = "/hotels/newest" component = {NewestHotels} />*/}
                     <PrivateRoute exact path = "/search" component = {Search} />
                     <PrivateRoute exact path = "/account" component = {Account} />
                  </Switch>

                  <Footer/>
               </div>
            </Router>
         </Provider>
      );

      setTimeout(() => {
         this.setState({appState : updatedAppState});
      }, 500);
   }


   render() {


      return this.state.appState;

   }
}

export default App;
