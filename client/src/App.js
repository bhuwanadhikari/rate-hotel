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

import Hotel from './containers/Hotel/Hotel';

import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';

//Basic routes imports
import Home from './containers/Home/Home';
import Hotels from './containers/Hotels/Hotels';
import Search from './containers/Search/Search';
import Profile from './containers/Account/Profile/Profile';
import SettingsAndPrivacy from './containers/Account/SettingsAndPrivacy/SettingsAndPrivacy';
import AboutUs from './containers/Account/AboutUs/AboutUs';
import Help from './containers/Account/Help/Help';

import setAuthToken from './utils/setAuthToken';
import {logUserOut, setUser} from './redux/actions/authActions';
import { clearCurrentProfile } from './redux/actions/profileActions';

import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';

import store from './redux/store/store';

//check for token
if(localStorage.jwtToken){
   //set auth token header auth to be used in every request
   setAuthToken(localStorage.jwtToken);
   //decode the token
   const decoded = jwt_decode(localStorage.jwtToken);
   //set user and is authenticated
   store.dispatch(setUser(decoded));

   //check for expired jwt
   const currentTime = Date.now()/1000;
   if(decoded.exp<currentTime){
      //Log the User Out
      store.dispatch(logUserOut());
      //Clear current Profile
      store.dispatch(clearCurrentProfile());
      //redirect to login
      window.location.href = '/login';
   }
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
                  <Navigation/>
                  <Switch>
                     <PublicRoute exact path = "/sign-up" component = {SignUp} />
                     <PublicRoute exact path = "/login" component = {Login} />
                     <PublicRoute exact path = "/" component = {Landing} history = {this.props.history} />
                     <Route exact path = "/all-hotels" component = {AllHotels} />
                     <Route exact path = "/about-us" component = {AboutUs} />
                     <Route exact path = "/help" component = {Help} />
                     <PrivateRoute exact path = "/home" component = {Home} />
                     <PrivateRoute         path = "/hotels" component = {Hotels} />
                     <PrivateRoute exact path = "/hotel/:id" component = {Hotel}/>
                     <PrivateRoute exact path = "/search" component = {Search} />
                     <PrivateRoute exact path = "/profile" component = {Profile} />
                     <PrivateRoute exact path = "/settings-and-privacy" component = {SettingsAndPrivacy} />
                     <PrivateRoute component = {Home}/>
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
