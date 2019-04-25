import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import './index.css';
import create from './Images/create.png';
import verify from './Images/verify.png';
import {withRouter} from "react-router-dom";
import {deploy} from './deploy';
class Verify extends React.Component{
	constructor(props) {
			super(props);
			this.state = {
				i : 0,
                maintxt :'Loading',
                maintxt2: '. . . ',
				displaytxt: '',
			};
        this.setUpDeploy();

	}
	setUpDeploy(){
        let returns = deploy();
        console.log(returns);
    }
    backTrack(){
		this.props.history.goBack();
    }
    goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
	render() {
			return (
				<div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">

				<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center mb-8">
        			Verify Certificate
        		</p>
				<span class="text-white text-3xl font-fancy font-bold text-center justify-center mb-8" ></span>
				<div class="mt-8 flex justify-center col-md-6 items-center" >
				<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="create" style={{cursor:'pointer'}} onClick={e => this.backTrack(e)}>Go Back</button>
				</div>
				</div>
				</div>
			);
	}
}
export default withRouter(Verify);
