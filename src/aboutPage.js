
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import Particles from 'react-particles-js';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import About from './about';
class AboutPage extends React.Component {
	constructor(props){
  		super(props);
  		
 }

	render() {
    	return (
			<div>
			<Particles
				className="bg-cover-image fixed w-screen h-screen z-n1"
				params={{
					"particles": {
						"number": {
							"value": 100
						},
						"size": {
							"value": 3
						}
					},
					"interactivity": {
						"events": {
							"onhover": {
								"enable": true,
								"mode": "repulse"
							}
						}
					}
				}}>          </Particles>
						<div class="z-n2">
		<Bar />
        <About />
	</div>
	</div>
	)	
	}
}

export default withRouter(AboutPage);
