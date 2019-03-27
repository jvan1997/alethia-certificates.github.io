
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
class About extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
			<div class="flex items-center h-screen w-full">
    			<div class="h-screen w-screen rounded pt-16 font-fancy font-bold">
					<h1 class="w-full text-5xl font-fancy font-bold block text-white text-center justify-center mb-6"> About </h1>
 					<p class="w-full text-xl font-fancy font-bold block text-white text-center justify-center mb-6">This is the temporary about page for Alethia that will explain what alethia is, etc etc. And context.</p>
		
				</div>
			</div>
	)	
	}
}

export default withRouter(About);
