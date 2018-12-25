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
import Search from './containers/Search/Search';
import UserAccount from './containers/Account/UserAccount/UserAccount';
import SettingsAndPrivacy from './containers/Account/SettingsAndPrivacy/SettingsAndPrivacy';
import AboutUs from './containers/Account/AboutUs/AboutUs';
import Help from './containers/Account/Help/Help';

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
                     <Route exact path = "/all-hotels" component = {AllHotels} />
                     <PrivateRoute exact path = "/sign-up" component = {SignUp} />
                     <PrivateRoute exact path = "/login" component = {Login} />
                     <Route exact path = "/about-us" component = {AboutUs} />
                     <Route exact path = "/help" component = {Help} />
                  </Switch>
                  <Switch>
                     <PrivateRoute exact path = "/home" component = {Home} />
                     <PrivateRoute       path = "/hotels" component = {Hotels} />
                     <PrivateRoute exact path = "/search" component = {Search} />
                     <PrivateRoute exact path = "/user-account" component = {UserAccount} />
                     <PrivateRoute exact path = "/settings-and-privacy" component = {SettingsAndPrivacy} />
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
