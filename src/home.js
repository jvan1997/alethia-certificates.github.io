import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import create from './Images/create.png';
import verify from './Images/verify.png';
import {withRouter} from "react-router-dom";
class Home extends React.Component{
	constructor(props) {
        	super(props);
	}	
	verifyCert(){
		this.props.history.push("/verify");
	}
	createCert() {
		this.props.history.push("/create");
	}
	
	render() {	
			return (
			<div className="App">
				<header className="App-header">
					<h1>
					Home
				</h1>

				<div class="col-md-6">
						<img src={create} onClick={() => this.createCert()} alt="create" />
						<img src={verify} onClick={() => this.verifyCert()} alt="verify" />
				</div>
			</header>
		</div>
			);
	}
}
export default withRouter(Home);
