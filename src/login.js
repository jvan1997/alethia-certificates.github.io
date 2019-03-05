import React from 'react';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
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
			<div className='App'>
		<form onSubmit={this.handleSignIn.bind(this)}>
        	<h3>Sign In </h3>
        		<input type="text" ref="email" placeholder="enter your email" />
				<br />
        		<input type="password" ref="password" placeholder="enter password" />
				<br></br>
        	<input type="submit" value="Login" />
			<Button onClick={() => this.backTrack()}> Cancel</Button>
			<Button value="signup" onClick={e => this.goTo(e)}> Sign Up</Button>
      	</form>
		 
		  </div>
		)	
	}
}

export default withRouter(Login);
