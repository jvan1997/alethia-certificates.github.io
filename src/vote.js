import React, { Component } from 'react';
import Certificate from './Ethereum/contracts/Certificate';
import web3 from './Ethereum/web3';
import './App.css';
import { withRouter } from 'react-router-dom';
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
    }
    addVote = async () => {

        const certificate = Certificate("0x5786E813128a99CaD43F6303Fcd6b46138BFd285");
        this.setState({ loading: true, errorMessage: '', successMessage: '' });
        try {
          const accounts = await web3.eth.getAccounts();
          certificate.methods.addVote().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.feeAmount, 'ether')
          });
    
          this.setState({ successMessage: `You've successfully paid ${this.state.feeAmount} ether for this certificate.` });
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
        const balance = await web3.eth.getBalance(this.props.address);
    
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
            <button class="inline-block h-16 w-48 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 mr-2  font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" style={{cursor:'pointer'}} onClick={this.addVote}>Vote</button>
            </div>
            </div>
            </div>)
      }
    }
    export default withRouter(Voting);
    