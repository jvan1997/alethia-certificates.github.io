import React from 'react';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import './css/tailwind.css';
import Particles from 'react-particles-js';
import Bar from './bar';
class Login extends React.Component {
	constructor(props){
  		super(props);
  		this.state={
 		 	email:'',
 		 	password:''
  		}
 }
		handleSignIn(e) {
	//		console.log(e);
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
		goTo(){
			this.props.history.push('/signup');
		}
		backTrack(){
			this.props.history.goBack();
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
            			id="email"  ref="email" type="text" placeholder="Enter Email"/>
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
					<a class="flex flex-col text-left text-white hover:text-grey text-s font-bold font-fancy italic" onClick={() => this.goTo()} value="signup" style={{cursor: 'pointer'}}>Don't have an Account?</a>
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
