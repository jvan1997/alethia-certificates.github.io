import React from 'react';
import './App.css';
import './index.css';
import { withRouter } from "react-router-dom";
import { deploy } from './deploy';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
let util = require('util')
let ethjsUtil = require('ethereumjs-util')
let keypair = require('keypair');


/**
 * Verify page that the user can navigate to in order to 
 * load their ethereum interaction, as well as transaction hash,
 * public and private key.
 */
class Verify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createdContractAddress: "",
			transactionHash: "",
			publicKey: "",
			metadataLoaded: false,
			compiled: false,
			verified: false,
			displayResults:false
		};
		this.setUpDeploy();
		this.setCompiled = this.setCompiled.bind(this)
		this.setVerified = this.setVerified.bind(this)
		this.setDisplayResults = this.setDisplayResults.bind(this)
	}
/**
 * Async request to call on the deploy method from deploy.js
 * Then it gets the returns from there and stores it onto the state.
 */
	async setUpDeploy() {
		let returns = await deploy();
		this.setState({
			createdContractAddress: returns.receipt.contractAddress,
			transactionHash: returns.transactionHash,
			metadataLoaded: true
		})
		let pair = keypair();
		setTimeout( this.setCompiled,3000)
		this.setState({
			publicKey:pair.public
		})

	}
	/**
	 * Allows the user to download the verification component as a pdf.
	 */
	downLoad= (e) => {

		html2canvas(document.querySelector("#transaction"),{width: 1200,
			height: 900
	  }).then(canvas => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({orientation:'l',unit:'px'});
			pdf.addImage(imgData,'PNG',0,0,1030,964,"a","FAST");
			pdf.save("transaction.pdf");
		});
	
	}
	/**
	 * Checks if hte user is logged in.
	 */
	componentWillMount(){
        let test = JSON.parse(localStorage.getItem("logged"));
        if(!test){
            this.props.history.push('/');
        }
	 }
	 /**
	  * The standard backtrack function to navigate back.
	  */
	backTrack() {
		this.props.history.goBack();
	}
	/**
	 * the standard reroute page to go to other pages.
	 * @param {The button click that has a destination.} event 
	 */
	goTo(event) {
		var destination = event.target.value;
		this.props.history.push(`/${destination}`);
	}
	/**
	 * The information is compiled timer.
	 */
	setCompiled(){
		this.setState({
			compiled:true
		})
		setTimeout(this.setVerified,3000)
	}
/**
 * The information is verified timer.
 */
	setVerified(){
		this.setState({
			verified:true
		})
		setTimeout(this.setDisplayResults,3000)
	}
	/**
	 * Displays the results when this boolean is true.
	 */
	setDisplayResults(){
		this.setState({
			displayResults:true
		})
	}
	/**
	 * Renders the verification page after loading the information.
	 * AFter it finishes loading, it will display the entire verification page
	 * This must have ganache client or some other program similar to it open in 
	 * order to use.
	 * It will show the Transaction Hash, Contract Address and PUblic Key.
	 */
	render() {
		if (!this.state.metadataLoaded) {

			return (
				<div class="flex items-center h-full " >
					<div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">
						<VerifyHeader />
						<LoadingComponent />
						<br />
						<div class="mt-8  justify-center col-md-6 items-center" >
							<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="create" style={{ cursor: 'pointer' }} onClick={e => this.backTrack(e)}>Go Back</button>
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div class="flex items-center h-full justify-center" >
					<div class="h-full  mx-auto pt-24 bg-transparent rounded">
						<VerifyHeader />
						<div id="transaction" class="container-xl bg-white font-fancy text-lg rounded text-center h-full px-6 py-4 border border-grey-dark">
						<span class="font-bold">Compiling Keypair... {this.state.compiled ? "Done!" : null} </span>

						{this.state.compiled ?
							(
								<span>
									<br />
									<span class="font-bold "> Verifying Keypair... {this.state.verified ? "Done!" : null} </span>

									{this.state.verified ? (
										
										<span>
											<br/>
											<span class="font-bold "> Success! Cert has been verified!</span>
											{this.state.displayResults ? (
												<span>
													<span>
														<div class="font-bold mt-2">Contract Address: </div>{this.state.createdContractAddress}
														<div class="flex flex-col items-center mt-4 mb-4">
															<div class="w-5/6  border-b "/>
														</div>
														<div class="font-bold ">Transaction Hash:</div> {this.state.transactionHash}
														<div class="flex flex-col items-center mt-4 mb-4">
															<div class="w-5/6  border-b "/>
														</div>
														<div class="font-bold">Public Key:</div>
														<span class="mb-2" style={{"white-space":"pre-line"}}> {this.state.publicKey}
														</span>
													</span>
													<br />	
												</span>

											) : null}
											
										</span>
									) : null}
								</span>
							) : null
						}
</div>
						<div class="mt-8  flex w-full justify-between col-md-6 items-center" >
							<button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="create" style={{ cursor: 'pointer' }} onClick={e => this.backTrack(e)}>Go Back</button>
							{this.state.displayResults  && (
							<button class="inline-block ml-8 h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" value="profile" style={{cursor:'pointer'}} onClick={this.downLoad}>Download</button>
							)
							}
						</div>
					</div>
				</div>
			)

		}
	}
}
export default withRouter(Verify);

const LoadingComponent = (props) => {
	return (
		<div class="container-xl bg-white font-fancy font-bold text-lg rounded text-center h-full px-4 py-4 border border-grey-dark">
		<span class="font-fancy font-bold text-lg"> Loading cert metadata ... </span>
		</div>
	)
}

const VerifyHeader = (props) => {
	return (
		<div>
			<p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center mb-8">
				Verify 
        		</p>
			<span class="text-white text-3xl font-fancy font-bold text-center justify-center mb-8" > </span>
		</div>
	)
}