
import React, { Component } from 'react';
import {firebaseApp} from "./firebase";
import {RegisterForm} from "./signUp";
import { Button} from 'react-bootstrap';
import create from './Images/newCreate.png';
import './App.css';
import { withRouter } from 'react-router-dom';
import Bar from './bar';
import {user,db,entry} from './functions';
class Profile extends React.Component {
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
      //      console.log("Document data:", data);
        } else {
            // doc.data() will be undefined in this case
            this.setState({ data: null });
      //      console.log("No such document!");
        }
    })
}
offLoad = (e) => {
	this.setState({data: ''});
}
editCert = (e) => {
	this.props.history.push("/profile/editCert");
}
createCert = (e) => {
	this.props.history.push("/create");
}

	render() {
		
	//	console.log("This is the data", this.state.data);
		let dataUI = this.state.data;
	//	console.log(dataUI);
		var keys = Object.keys(dataUI);
		if(dataUI){
			if(keys.length == 0 || dataUI["name"] == '' || dataUI["surname"] == ''|| dataUI["units"] == ''|| dataUI["sigid"] == '' || dataUI["major"] == ''){
				return (
					<div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-16 bg-transparent rounded">
	  				<h1 class=" font-fancy font-bold text-lg pl-20 text-white mb-4 ml-8 text-5xl "> Profile</h1>
					  <div class="text-center mb-8 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded px-4 pt-8 flex flex-col justify-between leading-normal">
      <p class="text text-red font-fancy font-bold flex items-center">
       No certificate found associated with this account.
      </p>

    <div class="flex items-center">
      <div class="w-10 h-10 rounded-full mr-4"></div>
    </div>
  </div>
					 <button class="inline-block  mr-12 h-16 w-32 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.offLoad}>Close</button>
					 <button class="inline-block  ml-12 h-16 w-32 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.createCert}>Create</button>

					</div>
					</div>

				);
			}
			else{
			console.log("Inside", dataUI);
			let major = dataUI["major"];
			let fname = dataUI["name"];
			let lname = dataUI["surname"];
			let units = dataUI["units"];
			let sigid = dataUI["sigid"]
		//	console.log(fname);
			return (
				<div class="flex items-center h-full " >
				<div class="container-xl h-full mx-auto pt-16 bg-transparent rounded">

					<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center pl-8 mb-10">
						Profile - Certificate
					</p>
					
					{/* <div class="max-w-sm mb-10 rounded overflow-hidden shadow-lg bg-white">
  						<img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  						<div class="px-6 py-4">
   	 						<div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    							<p class="text-grey-darker text-base">
      								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    							</p>
						</div>
						
					</div>  
					<div class="flex justify-center col-md-6 items-center" >
						<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.offLoad}>Close Certificate</button>
						<button class="inline-block ml-12 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.editCert}>Edit Certificate</button>
					</div> */}
					<div class="container-xl">
					<div class="max-w-md w-full pb-4 lg:flex mb-10 ">
  <div class="bg-white h-48 w-full lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"background-image": `url('${create}')`}} title="Woman holding a mug">
  </div>
  <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 pt-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <p class="text-sm text-grey-dark font-fancy font-bold flex items-center">
       Certificate Information
      </p>
      <div class="text-black font-bold font-fancy text-xl mb-2">Name:   {fname} {lname}</div>
	  <div class="text-black font-bold font-fancy text-xl mt-2 mb-2">Units Completed: {units}</div>
	  <div class="text-black font-bold font-fancy text-xl mt-2 mb-2">Major: {major}</div>
    </div>
    <div class="flex items-center">
      <div class="w-10 h-10 rounded-full mr-4"></div>
    </div>
  </div>
</div>
<div class="flex justify-center col-md-6 items-center" >
						<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.offLoad}>Close Certificate</button>
						<button class="inline-block ml-12 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.editCert}>Edit Certificate</button>
					</div> 
				</div>		
				</div>	
				</div>
				)	
		}
	}
	else{
    	return (
			<div class="flex items-center h-full " >
			<div class="container-xl h-full mx-auto pt-16 bg-transparent rounded">
	  	<h1 class=" mb-16 font-fancy font-bold text-lg pl-20 text-white mb-4 text-5xl "> Profile</h1>
		  <button class="inline-block ml-12 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.onLoad}>Display Certificate</button>
            
		</div>			

	</div>
	)	
	}}
}

export default withRouter(Profile);
