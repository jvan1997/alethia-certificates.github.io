import React from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
class Login extends React.Component {
	constructor(props){
  		super(props);
  		this.state={
 		 	email:'',
 		 	password:''
  		}
 }
		handleSignIn(e) {
			e.preventDefault()
			let email = this.refs.email.value
			let password = this.refs.password.value
			firebaseApp.auth().signInWithEmailAndPassword(email,password)
            .catch(error => {
                this.setState({error})
			})
			
		}
		signUpUser(){
			this.props.history.push('/signUp');
		}
	render() {
    	return (
			<div>
		<form onSubmit={this.handleSignIn.bind(this)}>
        	<h3>Sign In </h3>
        		<input type="text" ref="email" placeholder="enter your email" />
				<br />
        		<input type="password" ref="password" placeholder="enter password" />
				<br></br>
        	<input type="submit" value="Login" />
			<Button onClick={() => this.signUpUser()}> Sign Up</Button>
      	</form>
		 
		  </div>
		)	
	}
}

export default Login
