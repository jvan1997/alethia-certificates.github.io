import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import Home from './home';
import Bar from './bar';
class App extends Component {
 
	constructor(props) {
        super(props);
    }  

  render() {
    return (
	<div>
	<Bar />
	<Home />
	</div>
    );
  }
}
export default App;
