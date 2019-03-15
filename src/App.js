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
	        <div>
	        <Bar />
	        <Home />
	        </div>
          );
      }
    else{
      return (
      <div>
      <Bar />
      <Unsigned />
      </div>
    );
  }
}
}

export default App;
