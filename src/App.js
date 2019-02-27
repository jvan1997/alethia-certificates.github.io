import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
class App extends Component {
 
	constructor(props) {
        super(props);
	this.count = 0;
        this.state = {
            name: '',
            sigid: '', 
            major: '', 
            units: '',
	showComponent:false,
        };
	
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  
    signOutUser(){
      this.props.history.push('/login');
      firebaseApp.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      }
  render() {
    return (
	<div class="text-right">
		<Button class="float-right" onClick={() => this.signOutUser()}> Logout</Button>
	</div>
    );
  }
  handleChange(event) {
   // console.log("doing stuff");
    console.log(event.target.value);
    this.setState({
        [event.target.name]:event.target.value
	});
  }

  handleSubmit(event) {
	this.count += 1;	
//	console.log("this is count" + this.count);
    alert('A name was submitted: ' + this.state.name);
    console.log(this.state.name + "where is this");
    event.preventDefault();
  }
}
export default App;
