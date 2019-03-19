import React, { Component } from 'react';
import logo from './Images/logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler,withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
function user() {
//    console.log("What:" + auth.currentUser.email);
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
} 

class Unsigned extends Component {
	constructor(props) {
        super(props);
    }
    goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
	  <h1> Alethia </h1>
          <img src={logo} alt="Logo" />
          <p>
            Issue and Verify digital certificates with Ethereum Smart Contracts
          </p>
          <p>
              Login or Signup to Continue
          </p>
          <div class="col-md-6" >
          </div>
        </header>
              </div>
    );
  }
}
export default withRouter(Unsigned);
