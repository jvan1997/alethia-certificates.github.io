import React, { Component } from 'react';
import Certificate from './Backstuff/contracts/Certificate';
import web3 from './Backstuff/web3';
import {firebaseApp} from "./firebase";
import './App.css';
import { withRouter } from 'react-router-dom';
import {user,db,entry} from './functions';
import logo from './headerIcon.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: '',
            successMessage: '',
            feeAmount: '1'
        }
    }
    voteCalled(){
        let returns = this.vote();
        console.log(returns);
    }
    vote = async () => {
        console.log(this.props);

        const certificate = Certificate("0x82E8AF74a6765b4fC1fCea0e5046B35a4932a418");
        console.log(certificate);
        this.setState({ loading: true, errorMessage: '', successMessage: '' });
        try {
            console.log("inside try");
          const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
          certificate.methods.addVote().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.feeAmount, 'ether')
          });
          console.log("2");
    
          this.setState({ successMessage: `You've successfully paid ${this.state.feeAmount} ether for this certificate.` });
          console.log("3");
        } catch (err) {
            console.log(err.message);
          this.setState({ errorMessage: err.message });
        }
        console.log("4");
        const balance = await web3.eth.getBalance(this.props.address);
        console.log(`Balance is ${balance}`);
    
        this.setState({ loading: false});
      }
      render(){
          return(
        <div class="flex items-center h-full " >
        <div class="container-sm h-full mx-auto pt-16 bg-transparent rounded align-middle content-center items-center">

            <p class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center pl-8 mb-10">
                Vote on Certificate
            </p>
            <div class="flex">
            <button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" style={{cursor:'pointer'}} onClick={this.vote}>Vote</button>
            </div>
            </div>
            </div>)
      }
    }
    export default withRouter(Voting);
      //render might go here. 
      //UI needs to be added (button for voting such as onSubmit={this.vote})
