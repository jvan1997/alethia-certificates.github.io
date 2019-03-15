
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
class AboutPage extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
	<div>
		<Bar />
        This is the temporary about page for Alethia that will explain what alethia is, etc etc. And context.
	</div>
	)	
	}
}

export default withRouter(AboutPage);
