import React, { Component } from 'react';
import Certificate from './Backstuff/contracts/Certificate';
import web3 from './Backstuff/web3';

class Voting extends Component {
    state = {
      loading: false,
      errorMessage: '',
      successMessage: '',
      feeAmount: ''
    }

    vote = async () => {
        const certificate = Certificate(this.props.address);
        this.setState({ loading: true, errorMessage: '', successMessage: '' });
        try {
          const accounts = await web3.eth.getAccounts();
          await certificate.methods.vote().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.feeAmount, 'ether')
          });
    
          this.setState({ successMessage: `You've successfully paid ${this.state.feeAmount} ether for this certificate.` });
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
    
        const balance = await web3.eth.getBalance(this.props.address);
        console.log(`Balance is ${balance}`);
    
        this.setState({ loading: false});
      }

      //render might go here. 
      //UI needs to be added (button for voting such as onSubmit={this.vote})
}