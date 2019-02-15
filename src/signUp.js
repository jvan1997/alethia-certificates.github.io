import React, { Component } from 'react';
import './App.css';
import {firebaseApp} from "./firebase";
function user() {
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}
class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }  
 	SignUp(e){
	e.preventDefault()
	let email = this.refs.email.value;
    	let password = this.refs.password.value;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password)
            .catch(error => {
                this.setState({error})
		alert(error)
			});
			this.props.history.push('/login');
	}
	
	render() {
    		return (
			<form onSubmit={this.SignUp.bind(this)}>
        		<h3>Sign Up</h3>
        		<input type="text" ref="email" placeholder="enter your email" />
        		<input type="password" ref="password" placeholder="enter password" />
        		<input type="submit" value="Register" />
      			</form>
    );
  }

}
export default RegisterForm;