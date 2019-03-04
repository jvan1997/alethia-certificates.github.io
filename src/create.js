import React, { Component } from 'react';
import logo from './Images/logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler,withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
function user() {
//    console.log("What:" + auth.currentUser.email);
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
} 

class Create extends Component {
	constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname:'',
            sigid: '', 
            major: '', 
            units: '',
        };
	
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  
        backTrack(){
     	this.props.history.goBack();
     }
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
	  <h1> Create Certificate </h1>
          <img src={logo} alt="Logo" />
          <p>
            Issue and Verify digital certificates with Ethereum Smart Contracts
          </p>
    <form onSubmit={this.handleSubmit}>
            <label>
                First Name:
                <input id="name" type="text" name="name" onChange={this.handleChange}/>
                <br />
                Last Name:
                <input id="surname" type="text" name="surname" onChange={this.handleChange}/>
            </label>
        <br />
            Signature ID:
            <input id="sigid"  type="text" name="sigid" onChange={this.handleChange}/>
        <br />
            Major:
             <select id="major" name="major" onChange={this.handleChange} >	
		        <option value="-1"> Major </option>
            <option value="Aerospace">Aerospace</option>
            <option value="Biomedical">Biomedical</option>
            <option value="Bioengineering">Bioengineering</option>
		        <option value="Chemical">Chemical</option>
            <option value="Civil">Civil</option>
            <option value="Computer">Computer</option>
		        <option value="Electrical">Electrical</option>
            <option value="Industrial">Industrial</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Software">Software</option>

          </select>
        <br />
            Units Completed:
            <input id="units" type="text" name="units" onChange={this.handleChange}/>
        <br />
	    <Button onClick={() => this.backTrack()}> Cancel</Button>
            <input type="submit" value="Generate" />
           
    </form>
        </header>

              </div>
    );
  }
  handleChange(event) {
   // console.log("doing stuff");
    //console.log(event.target.value);
    this.setState({
        [event.target.name]:event.target.value
	});
  }

  handleSubmit(event) {
    event.preventDefault();
    entry().update({"certificate":this.state}).then(function() {
		alert("Created certificate");
  });
  this.backTrack();
  }
}
export default withRouter(Create);
