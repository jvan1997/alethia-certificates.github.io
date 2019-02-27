import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import Home from './home';
import Logout from './logout';
class App extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
	<div>
	<Logout />
	<Home />
	</div>
    );
  }
}
export default App;
