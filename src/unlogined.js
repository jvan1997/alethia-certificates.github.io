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
      <div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">

				<p class="w-full block text-white font-mono text-5xl font-bold text-center justify-center mb-16">
        		 Home
        		</p>

				<div class="w-full block text-white font-mono text-xl font-bold text-center justify-center mb-16" >
						{/* <div>
						<img class="mr-16 w-1/2" style={{cursor:'pointer'}} src={create} onClick={e => this.goTo(e)} alt="create" />
						</div>
						<img class="ml-16 w-1/3" style={{cursor:'pointer'}} src={verify} onClick={e => this.goTo(e)} alt="verify" /> */}
			  <p class="mb-16">
            Issue and Verify digital certificates with Ethereum Smart Contracts
          </p>
          <p>
          Login or Signup to Begin
          </p>
				</div>
				</div>
				</div>
    );
  }
}
export default withRouter(Unsigned);
