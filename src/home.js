import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import { Button} from 'react-bootstrap';
import create from './Images/create.png';
import verify from './Images/verify.png';
import {withRouter} from "react-router-dom";
class Home extends React.Component{
	constructor(props) {
        	super(props);
	}	
	goTo(event){
		var destination = event.target.alt;
		this.props.history.push(`/${destination}`);
	}
	render() {
		
			return (
			<div className="App">
				<header className="App-header">
					<h1>
					Home
				</h1>

				<div class="col-md-6" >
						<img style={{cursor:'pointer'}} src={create} onClick={e => this.goTo(e)} alt="create" />
						<img style={{cursor:'pointer'}} src={verify} onClick={e => this.goTo(e)} alt="verify" />
				</div>
			</header>
		</div>
			);
	}
}
export default withRouter(Home);
