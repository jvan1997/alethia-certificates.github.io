
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import {user,db,entry} from './functions';
class ProfilePage extends React.Component {
	constructor(props){
    super(props);
    this.state = {
        inputField: '',
        data: '',
    };
}
onLoad = (e) => {

   	entry().get().then((doc) => {
        if (doc.exists) {
            let data = doc.data()['certificate'];
            this.setState({ data: data });
            console.log("Document data:", data);
        } else {
            // doc.data() will be undefined in this case
            this.setState({ data: null });
            console.log("No such document!");
        }
    })
}
offLoad = (e) => {
	this.setState({data: null});
}
editCert = (e) => {
	this.props.history.push("/profile/edit");
}

	render() {
		
		console.log("This is the data", this.state.data);
		let dataUI = this.state.data;
		console.log(dataUI);
		
		if(dataUI){
			console.log("Inside", dataUI);
			let major = dataUI["major"];
			let fname = dataUI["name"];
			let lname = dataUI["surname"];
			let units = dataUI["units"];
			let sigid = dataUI["sigid"]
			console.log(fname);
			return (
				<div>
					<Bar />
					  <div>
					<h1>Profile</h1>
					<button onClick={this.offLoad}>Close Certificate</button>
					<button onClick={this.editCert}>Edit Certificate</button>
					<div>
						<p> Name: {fname} {lname}</p>
						<p> Major: {major} </p>
						<p> Units: {units} </p>
						<p> Signature ID: {sigid}</p>
					  
				</div>
						</div>		
					
				</div>
				)	
		}
	else{
    	return (
	<div>
		<Bar />
		  	<div>
				<h1>Profile</h1>
				<button onClick={this.onLoad}>View Certificate</button>
            </div>			
	</div>
	)	
	}}
}

export default withRouter(ProfilePage);
