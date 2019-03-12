import React from 'react';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import './css/tailwind.css';
class Login extends React.Component {
	constructor(props){
  		super(props);
  		this.state={
 		 	email:'',
 		 	password:''
  		}
 }
		handleSignIn(e) {
			console.log(e);
			e.preventDefault()
			let email = this.refs.email.value
			let password = this.refs.password.value
			firebaseApp.auth().signInWithEmailAndPassword(email,password)
            .catch(error => {
                this.setState({error})
		alert(error);
			})
			
		}
		goTo(event){
			var destination = event.target.value;
			this.props.history.push(`/${destination}`)
		}
		backTrack(){
			this.props.history.goBack();
		}
	render() {
    	return (
<div class="flex items-center h-screen w-full">
        <div class="w-screen bg-white rounded">
        <h1 class="HotelHopperLogin w-full block text-purple-light text-center justify-center mb-6">
        Sign in to Alethia
        </h1>

        <form onSubmit={this.handleSignIn.bind(this)} class="mb-4 items-center">
        <div class="flex flex-col mb-4 items-center">
            <input class="Rectangle shadow appearance-none border border-purple-light rounded w-1/3 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            id="email"  ref="email" type="text" placeholder="Enter Email"/>
        </div>
        <div class="flex flex-col mb-6 items-center">
            <input class="Rectangle shadow appearance-none border border-purple-light rounded w-1/3 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" ref="password"type="password" placeholder="******************"/>

        </div>
        <div class="flex items-center justify-center mb-6">
			<button onClick={() => this.backTrack()} class="Rectangle bg-purple hover:purple-blue-dark text-white font-bold py-2 px-4 md:mr-2 rounded" type="button">Cancel</button>
            <input class="Rectangle bg-purple hover:purple-blue-dark text-white font-bold py-2 px-4 md:ml-2 rounded" type="submit" value="Login" />
        </div>
		<div class="flex items-center justify-center">
			<button onClick={e => this.goTo(e)} class="Rectangle bg-purple hover:purple-blue-dark text-white font-bold py-2 px-4 rounded" type="button" value="signup">Sign Up</button>
        </div>
        </form>
        </div>     
        </div>
		)	
	}
}

export default withRouter(Login);
