
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import Verify from './verify';
class VerifyPage extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
	<div class="bg-cover-image h-screen" >
		<div>
		  <Bar />
		  <Verify/>
		  </div>
		</div>
	)	
	}
}

export default withRouter(VerifyPage);
