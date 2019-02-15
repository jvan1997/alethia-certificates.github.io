import React from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
class Error extends React.Component {
	constructor(props){
  		super(props);
  		
 }
		
	render() {
    	return (
		<div>Error: Path does not exist.</div>
		)	
	}
}

export default Error
