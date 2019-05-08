import React from 'react';
import {firebaseApp} from "./firebase";
import {withRouter} from "react-router-dom";
import './index.css';
import Particles from 'react-particles-js';
import Bar from './bar';
/**
 * Login page component that is loaded. It uses firebase to log in the user
 * 
 */
class Login extends React.Component {
	constructor(props){
  		super(props);
  		this.state={
 		 	email:'',
 		 	password:''
  		}
 }
 /**
  * When the user clicks on login, if they entered all the information in correctly
  * The firebase will login them in by assigning the token to local storage and
  * redirecting them to the home page.
  */
	handleSignIn(e) {
		e.preventDefault()
		let email = this.refs.email.value
		let password = this.refs.password.value
		firebaseApp.auth().signInWithEmailAndPassword(email,password).then(response=>{
			let tokenKey = "logged";
					let tokenValue = true;
					window.localStorage.setItem(tokenKey, JSON.stringify(tokenValue));
					this.props.history.push('/');
		})
		.catch(error => {
			this.setState({error})
			let tokenKey = "logged";
			let tokenValue = false;
			window.localStorage.setItem(tokenKey, JSON.stringify(tokenValue));
			alert(error);
		});
		
	}
/**
 * Takes the user to the sign up if they do not have an account
 */
	goTo(){
		this.props.history.push('/signup');
	}
/**
 * The back button if the user wishes to not login
 */
	backTrack(){
		this.props.history.goBack();
	}
/**
 * The render method that loads the text input fields, buttons
 * the particles background.
 */
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
			}}>          
			</Particles>
			<div class="z-n2">
			<Bar />
			<div class="flex items-center h-full">
        		<div class=" w-full rounded pt-16 font-fancy font-bold">
        			<h1 class="HotelHopperLogin w-full font-fancy font-bold block text-white text-center justify-center mb-6">
        				Sign in to Alethia
        			</h1>

        			<form onSubmit={this.handleSignIn.bind(this)} class="mb-4 items-center">
        			<div class="flex flex-col mb-4 items-center">
            			<input class="Rectangle font-fancy font-bold shadow appearance-none border border-purple-lighter rounded h-14 w-1/4 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            			id="email"  ref="email" type="email" placeholder="Enter Email"/>
        			</div>
        			<div class="flex flex-col mb-6 items-center">
            			<input class="Rectangle font-fancy font-bold shadow appearance-none border border-purple-lighter rounded h-14 w-1/4 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            			id="password" ref="password"type="password" placeholder="Enter Password"/>

        			</div>
        			<div class="flex items-center justify-center mb-6">
						<button onClick={() => this.backTrack()} class="Rectangle bg-transparent border border-white text-white hover:border-grey hover:text-grey font-bold py-2 px-4 md:mr-2 rounded" type="button">Cancel</button>
            			<input class="Rectangle bg-transparent border border-white text-white hover:border-grey hover:text-grey font-bold font-fancy py-2 px-4 md:ml-2 rounded" type="submit" value="Login" />
        			</div>
					<div class="flex items-center justify-center">
					<button class="flex flex-col text-left text-white hover:text-grey text-s font-bold font-fancy italic" onClick={() => this.goTo()} value="signup" style={{cursor: 'pointer'}}>Don't have an Account?</button>
       			 	</div>
        			</form>
        		</div>     
        	</div>
			</div>
			</div>
		)	
	}
}

export default withRouter(Login);
