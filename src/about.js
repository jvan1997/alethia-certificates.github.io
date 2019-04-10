
import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import jon from './Images/jonathan.jpg';
import jenil from './Images/jenil.jpg';
class About extends React.Component {
	constructor(props){
		  super(props);
		  this.state={
			  status: 0,
			  team:{
				jenil:{
					name: 'Jenil Thakker',
					about: '',
					contribution: '',
					img: jenil,
				},
				jonathan:{
					name: 'Jonathan Van',
					about: '',
					contribution: '',
					img: jon,
				},
				vincent:{
					name: 'Vincent Diep',
					about: '',
					contribution: '',
					img: jon,
				}
			  }
		  }
  		
 }
 goTo(event){
	let value = event.target.value;
	 if(value==='alethia'){
		this.setState({
			status:1
		 });
	 }
	 else if (value ==='team'){
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
renderTeam()
{
	let teamMates = []
	for (var key in this.state.team) {
		teamMates.push(

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <article class="overflow-hidden bg-white rounded-lg shadow-lg">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full border-b-2 border-grey" src={this.state.team[key]["img"]}/>
                </a>

                <header class="flex items-center text-center flex-col justify-center leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <span class="no-underline text-black" >
                            {this.state.team[key]["name"]}
                        </span>
                    </h1>
					<div>
					<h1 class="text-base">
                        <span class="no-underline text-black" >
						{this.state.team[key]["about"]}
                        </span>
                    </h1>
					<h1 class="text-base">
                        <span class="no-underline text-black" >
						{this.state.team[key]["contribution"]}
                        </span>
                    </h1>
					</div>
                </header>

            </article>

		</div>)
	}
	return teamMates;
}
	render() {
		if(this.state.status === 0){
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
		);	
	}
		else if (this.state.status === 1){
			return(
			<div class="flex items-center h-screen w-full">
			<div class="container-xl h-screen w-screen rounded pt-24 font-fancy justify-center font-bold">
				<h1 class="w-full text-5xl font-fancy font-bold block text-white text-center justify-center mb-6"> About - Alethia </h1>
				<div class="mt-8 flex justify-center col-md-6 items-center" >
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="about" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Return</button>
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="team" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Team</button>
	
					</div>
			</div>
			</div>);
	}
		else{
				return(
					<div class="flex items-center h-screen w-full">
					<div class="container-xl h-screen w-screen rounded pt-24 font-fancy justify-center font-bold">
						<h1 class="w-full text-5xl font-fancy font-bold block text-white text-center justify-center mb-6"> Team Members </h1>
						<div>
						<div class="container my-12 mx-auto px-4 md:px-12">
						<div class="flex flex-wrap -mx-1 lg:-mx-4">
						{this.renderTeam()}
					</div>
					</div>
						</div>
						<div class="mt-8 flex justify-center col-md-6 items-center" >
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="about" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Return</button>
					<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="alethia" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>What is Alethia</button>
	
					</div>
					</div>
					</div>
				);
		}
	}
}

export default withRouter(About);
