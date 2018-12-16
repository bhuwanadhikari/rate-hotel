import React, { Component } from 'react';
import './App.css'; //CSS for all of the apps
import Splash from './components/ui/Splash/Splash';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import AllHotels from './components/AllHotels/AllHotels';
import Footer from './components/Footer/Footer';

import Navigation from './components/Navigation/Navigation';


class App extends Component {
   state = {
      appState: (<Splash/>)
   };



   componentDidMount(){

      const updatedAppState = (
         <Router>
            <div className="App">
               <Navigation/>
               <Route exact path = "/" component = {Landing} />
               <Route exact path = "/signup" component = {SignUp} />
               <Route exact path = "/login" component = {Login} />
               <Route exact path = "/allHotels" component = {AllHotels} />

               <Footer/>
            </div>
         </Router>);

      setTimeout(() => {
         this.setState({appState : updatedAppState});
      }, 500);
   }


   render() {


      return this.state.appState;

   }
}

export default App;
