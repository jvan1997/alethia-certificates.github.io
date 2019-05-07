
import React from 'react';
import {firebaseApp} from "./firebase";
import './App.css';
import { withRouter } from 'react-router-dom';
import {entry} from './functions';
import logo from './headerIcon.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
  
class Profile extends React.Component {
	constructor(props){
    super(props);
    this.state = {
		loading: true,
        inputField: '',
        data: {},
    };
}
/**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
  componentWillMount() {
	let test = JSON.parse(localStorage.getItem("logged"));
	if(test){
    this.authSubscription = firebaseApp.auth().onAuthStateChanged((user) => {
		entry().get().then((doc) => {
			if (doc.exists) {
				let data = doc.data()['certificate'];
				this.setState({ data: data });
			} else {
				this.setState({ data: null });
			}
			this.setState({
				loading: false,
			  });
		})

	});}
	else{
		
	}
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }


goTo(event){
	var destination = event.target.value;
	this.props.history.push(`/${destination}`);
}

editCert = (e) => {
	this.props.history.push("/profile/editCert");
}
createCert = (e) => {
	this.props.history.push("/create");
}
downLoad= (e) => {
	html2canvas(document.querySelector("#certificate"),{ width: 892,
	height: 964
  }).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF({orientation:'p',unit:'px'});
		pdf.addImage(imgData,'PNG',0,0,892,964,"a","FAST");
		pdf.save("certificate.pdf");
	});

}
vote = (e) =>{
	this.props.history.push("/vote");

}
	render() {
		if(this.state.loading){
			return null;
		}
		let dataUI = this.state.data;
		var keys = Object.keys(dataUI);
		if(dataUI){
			if(keys.length === 0 || dataUI["name"] === '' || dataUI["surname"] === ''|| dataUI["units"] === ''|| dataUI["sigid"] === '' || dataUI["major"] === ''){
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
					 <button class="inline-block  ml-12 h-16 w-2/3 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.createCert}>Create</button>

					</div>
					</div>

				);
			}
			else{
			let major = dataUI["major"];
			let fname = dataUI["name"];
			let lname = dataUI["surname"];
			return (
				<div class="flex items-center h-full " >
				<div class="container-sm h-full mx-auto pt-16 pb-10 bg-transparent rounded align-middle content-center items-center">

					<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center pl-8 mb-10">
						Profile
					</p>
					<div class="flex">
					<div class="container-sm flex flex-col rounded border-4 ">
					<div id="certificate" class="w-auto align-center bg-white container-sm shadow-lg text-center font-fancy font-bold  px-8 pt-6 pb-8 m-auto">
						<div class="text text-xs mb-2"> This certificate is intended for verification purposes.</div>
						<div class="flex flex-col items-center mt-2 mb-8">
							<div class="w-1/2  border-b mt-2"/>
						</div>
						
						<div class="text text-3xl mb-2"> {fname} </div>
						
						<div class="text text-3xl mb-2"> {lname} </div>
						<div class="text text-xl mt-2 mb-2"> {major}</div>
						<div class="text text-2xl mt-2 mb-6"> San Jose State University</div>
						<div class="flex flex-col items-center">
						</div>
						<div class="flex flex-col items-center mt-2 mb-8">
							<div class="w-1/2  border-b mt-2"/>
						</div>
						<div class="text-base italic mb-14"> This certifies that the named individual's college degree is valid.</div>
						<img class="border rounded fill-current mr-2 " alt="" width="100" height="100" src={logo} />
					</div>
					
					</div>	
					<div class="mt-8 flex flex-col">
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.editCert}>Edit</button>
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="verify" style={{cursor:'pointer'}} onClick={(e) => this.goTo(e)}>Verify</button>
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="vote" style={{cursor:'pointer'}} onClick={(e) => this.goTo(e)}>Vote</button>
					<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.downLoad}>Download</button>

					</div>
					</div>
				</div>	
				</div>
				)	
		}
	}
	
	}
}

export default withRouter(Profile);
