
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
class ProfilePage extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
	<div>
		<Bar />
        This is the page for verification. Yet to be implemented.
        Will have an option to view one's own certificate, where they can edit it and etc.
        And another option to verify/examine other certificiates.
	</div>
	)	
	}
}

export default withRouter(ProfilePage);
