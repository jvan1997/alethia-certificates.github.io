
import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
class About extends React.Component {
	constructor(props){
		  super(props);
		  this.state={
			  status: 0
		  }
  		
 }
 goTo(event){
	 if(event.value==='alethia'){
		this.setState({
			status:1
		 });
	 }
	 else if (event.value ==='team'){
		this.setState({
			status:2
		 });
	 }
	 else{
		 this.setState({
			status:0
		 });
	 }
 }

	render() {
    	return (
			<div class="flex items-center h-screen w-full">
    			<div class="container-xl h-screen w-screen rounded pt-24 font-fancy justify-center font-bold">
					<h1 class="w-full text-5xl font-fancy font-bold block text-white text-center justify-center mb-6"> About </h1>
 					<p class="w-full text-xl font-fancy font-bold block text-white text-center justify-center mb-6">This page contains information on what Alethia is and the team behind the web application</p>
					 <div class="mt-8 flex justify-center col-md-6 items-center" >
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="alethia" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>What is Alethia</button>
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="team" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Team Members</button>
					</div>
				</div>
			</div>
	)	
	}
}

export default withRouter(About);
