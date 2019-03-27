
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import About from './about';
class AboutPage extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
	<div class="bg-cover-image h-full">
		<Bar />
        <About />
	</div>
	)	
	}
}

export default withRouter(AboutPage);
