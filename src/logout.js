
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';


class Logout extends React.Component {
	constructor(props){
  		super(props);
  		
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

            <Button onClick={() => this.signOutUser()}> Logout</Button>
		)	
	}
}

export default Logout;
