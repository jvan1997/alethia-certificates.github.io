import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import './index.css';
import create from './Images/create.png';
import verify from './Images/verify.png';
import {withRouter} from "react-router-dom";
class Home extends React.Component{
	constructor(props) {
        	super(props);
	}	
	goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
	render() {
		
			return (
				<div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">

				<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center mb-16">
        			Alethia
        		</p>

				<div class="flex justify-center col-md-6 items-center" >
						{/* <div>
						<img class="mr-16 w-1/2" style={{cursor:'pointer'}} src={create} onClick={e => this.goTo(e)} alt="create" />
						</div>
						<img class="ml-16 w-1/3" style={{cursor:'pointer'}} src={verify} onClick={e => this.goTo(e)} alt="verify" /> */}
				<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="create" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Create Certificate</button>
				<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>View Certificate</button>

				</div>
				</div>
				</div>
			);
	}
}
export default withRouter(Home);
