import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import Home from './home';
import Bar from './bar';
import Unsigned from './unlogined';
class App extends Component {
 
	constructor(props) {
        super(props);
        this.state = {
          logged:false,
      };
    }  
    componentDidMount() {
      firebaseApp.auth().onAuthStateChanged(user => {
          if(user){
            this.setState({ logged: true });
          }
        else{
          this.setState({ logged: false });
        }})}
  render() {
   // console.log(this.state.logged);
    if(this.state.logged){ 
      //console.log("I went here");    
      return (

	        <div class="bg-cover-image h-screen" >
          <div class="opacity-100">
	        <Bar />
	        <Home />
	        </div>
          </div>
          );
      }
    else{
      return (
        
      <div class="bg-cover-image opacity-100 h-screen">
      <div class="opacity-100">
      <Bar />
      <Unsigned />
      </div>
      </div>
    );
  }
}
}

export default App;
