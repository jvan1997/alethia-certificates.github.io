
import React from 'react';
import {firebaseApp} from "./firebase";
import './App.css';
import { withRouter } from 'react-router-dom';
import logo from './headerIcon.png';
import ethereum from './Images/ethereum.png'
/**
 * Header bar with options for the user.
 */
class Bar extends React.Component {
	constructor(props){
		  super(props);

		  this.state = {
				name:"",
				logged:false,
			}
  	
 }
/**
 * Loads the local storage boolean beforehand so that we can instantly
 *  determine what bar to render.
 */
 componentDidMount() {
	let test = JSON.parse(localStorage.getItem("logged"));
	this.setState({logged:test});
}
/**
 * Each button routes the user to a different page based on their value
 * @param {The source of the button} event 
 */
	goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
	/**
	 * Each image's alt can also link to a different page (this is usually for home)
	 * @param {The image} event 
	 */
	goToImg(event){
		var destination = event.target.alt;
		this.props.history.push(`/${destination}`);
	}
	/**
	 * The sign out function; After signing out, it sets login token to false and redirects to the home page.
	 */
	signOutUser(){

        firebaseApp.auth().signOut().then(function() {
						let tokenKey = "logged";
						let tokenValue = false;
						window.localStorage.setItem(tokenKey, JSON.stringify(tokenValue));
						this.props.history.push('/');
          }.bind(this), function(error) {
					});

    }
	render() {
    let test = JSON.parse(localStorage.getItem("logged"));
		if(test){
	return(
	<nav class="flex items-center justify-between flex-wrap bg-transparent p-2">
	<div class="flex items-center flex-no-shrink text-white pl-6 mr-6">
	<img class="border rounded fill-current mr-2 " width="60" height="60" alt="" style={{cursor:'pointer'}} onClick={e => this.goToImg(e)} src={logo} />
	<button class="text-white -mt-1 font-fancy font-bold  ml-2 mr-3 text-3xl cursor-pointer" value="" onClick={e => this.goTo(e)} > x </button>

	<img class="rounded fill-current mr-2 " width="50" height="50" alt="" style={{cursor:'pointer'}} onClick={e => this.goToImg(e)} src={ethereum} />

		</div>
<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
	<div class="text-sm lg:flex-grow">
	</div>
	<div>
	<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Home</button>
	<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="about" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>About</button>
<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Profile</button>
		<button class="inline-block px-4 py-2 ml-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" style={{cursor:'pointer'}} onClick={() => this.signOutUser()}>Sign Out</button>
	</div>
</div>
</nav>
);
    
	}
else{
	return(
		<nav class="flex items-center justify-between flex-wrap bg-transparent p-2">
		<div class="flex items-center flex-no-shrink text-white pl-6 mr-6">
	<img class="border rounded fill-current mr-2 " width="60" height="60" alt="" style={{cursor:'pointer'}} onClick={e => this.goToImg(e)} src={logo} />
		
	<button class="text-grey-darkest -mt-1 font-fancy font-bold  ml-2 mr-3 text-4xl cursor-pointer" value="" onClick={e => this.goTo(e)} > X </button>

<img class="rounded fill-current mr-2 " width="40" height="40" alt="" style={{cursor:'pointer'}} onClick={e => this.goToImg(e)} src={ethereum} />
</div>

<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
	<div class="text-sm lg:flex-grow">

	</div>
	<div>
	<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Home</button>
	<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="about" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>About</button>

	<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="login" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Login</button>
		<button class="inline-block px-4 py-2 ml-2 mr-2 leading-none font-fancy font-bold text-lg border rounded text-white border-white hover:border-grey-dark hover:text-grey-dark mt-4 lg:mt-0" value="signup" style={{cursor:'pointer'}} onClick={e => this.goTo(e)}>Sign Up</button>
	</div>
</div>
</nav>
);
}}
}

export default withRouter(Bar);