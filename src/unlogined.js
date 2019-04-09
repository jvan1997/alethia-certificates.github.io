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

class Unsigned extends Component {
		constructor(props) {
			super(props);
			this.state = {
				i : 0,
				j: 0,
				maintxt :'Issue and Verify digital certificates with Ethereum Smart Contracts',
				maintxt2: 'Login or Signup to Begin',
				speed : 100,
				displaytxt: '',
			};


	}
	componentDidMount() {
		this.timeout = setInterval(() => {
		  if (this.state.i < this.state.maintxt.length) {
			let newI = this.state.i+1;
			this.setState({ i: newI });
				}
				else{
					if (this.state.j < this.state.maintxt2.length){
							let newJ = this.state.maintxt2.length;
							this.setState({ j: newJ });
				}
			}
	  	
		}, 100);
	  }
	  componentWillUnmount() {
		clearInterval(this.timeout);
	  }
    goTo(event){
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
  render() {
		let displaytext = this.state.maintxt.substring(0,this.state.i);
		let displaytext2 = this.state.maintxt2.substring(0,this.state.j);
    return (
      <div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">

				<p class="w-full block text-white text-5xl font-bold font-fancy text-center justify-center mb-16">
        		 Home
        		</p>

				<div class="w-full block text-white  text-3xl font-bold text-center font-fancy justify-center mb-16" >
						{/* <div>
						<img class="mr-16 w-1/2" style={{cursor:'pointer'}} src={create} onClick={e => this.goTo(e)} alt="create" />
						</div>
						<img class="ml-16 w-1/3" style={{cursor:'pointer'}} src={verify} onClick={e => this.goTo(e)} alt="verify" /> */}
			  <p class="mb-16">
           {displaytext}
          </p>
          <p class="text-xl">
						{displaytext2}
          </p>
				</div>
				</div>
				</div>
    );
  }
}
export default withRouter(Unsigned);
