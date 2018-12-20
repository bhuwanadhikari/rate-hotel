import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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


import Home from './containers/Home/Home'
import Hotels from './containers/Hotels/Hotels'
import Search from './containers/Search/Search'
import Account from './containers/Account/Account'

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';

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
                  <Navigation/>
                  <Route exact path = "/" component = {Landing} history = {this.props.history} />
                  <Route exact path = "/allHotels" component = {AllHotels} />
                  <Route exact path = "/signup" component = {SignUp} />
                  <Route exact path = "/login" component = {Login} />
                  <Route exact path = "/home" component = {Home} />
                  <Route exact path = "/hotels" component = {Hotels} />
                  <Route exact path = "/search" component = {Search} />
                  <Route exact path = "/account" component = {Account} />

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
