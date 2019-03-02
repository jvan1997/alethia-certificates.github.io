import React, { Component } from 'react';
import './App.css';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
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
		//	this.props.history.push('/login');
	let firstname = this.refs.firstname.value;
	let surname = this.refs.surname.value;
	let idNum = this.refs.idNum.value;
	var information = {
			name:firstname, lastname:surname, idNum:idNum
		};
	
	var certificate = {};
	
	db().doc(email.toLowerCase()).set({
            information,certificate
        });
		
	}
	backTrack(){
		this.props.history.goBack();
	}
	render() {
    		return (
			<div className='App'>
			<form onSubmit={this.SignUp.bind(this)}>
        		<h3>Sign Up</h3>
        		<input type="text" ref="email" placeholder="enter your email" />
			<br></br>
        		<input type="password" ref="password" placeholder="enter password" />
			<br></br>
			<input type="text" ref="firstname" placeholder="enter your first name" />
			<br></br>
			<input type="text" ref="surname" placeholder="enter your last  name" />
			<br></br>
			<input type="text" ref="idNum" placeholder="enter student id number" />
			<br></br>

        		<Button onClick={() => this.backTrack()}> Cancel</Button>
			<input type="submit" value="Register" />
			
      			</form>	

			</div>
    );
  }

}
export default RegisterForm;
