
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
function user() {
	    console.log("What:" + firebaseApp.auth().currentUser.email);
		return firebaseApp.auth().currentUser;
	}
	function db() {
		return firebaseApp.firestore().collection('users');
	}
	function entry() {
		return db().doc(user().email);
	}
class Bar extends React.Component {
	constructor(props){
		  super(props);
		  var that = this;
		  this.state = {name:""}
		  firebaseApp.auth().onAuthStateChanged(function(user) {
			if (user) {
				var data = {};
				var getName = entry().get().then(function(doc) {
					//console.log(doc.data().length);
					data = doc.data();
			//        console.log(people);
					return data;
				});
				var namePromise = getName.then(function(datas){
					console.log(datas);
					that.setState({
						...that.state,
						name:datas['information']['name']
				})});
			} else {
			  // No user is signed in.
			}
		  });
  		
 }
	goToHome(){
		this.props.history.push('/');
	}
	goToProfile(){
		this.props.history.push('/profile');	
	}
	signOutUser(){
        this.props.history.push('/login');
        firebaseApp.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
	render() {

    	return (
		<div class="text-right">
		Welcome {this.state.name}      
		<Button class="float-right" onClick={() => this.goToHome()}> Home</Button>
		<Button class="float-right" onClick={() => this.goToProfile()}> Profile</Button>
        <Button class="float-right" onClick={() => this.signOutUser()}> Logout</Button>
		</div>
		)	
	}
}

export default withRouter(Bar);
