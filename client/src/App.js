import React, { Component } from 'react';
import './App.css';
import Splash from './components/ui/Splash';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';


class App extends Component {
   state = {
      hideSplash: false
   };

   componentDidMount(){
      setTimeout(() => {
         this.setState({hideSplash : true});
      }, 10);
   }


  render() {


     return (
        <div className="App">
           <Splash hideSplash = {this.state.hideSplash}/>
           <SignUp/>
           <Login/>

        </div>
     );
  }
}

export default App;
