import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler,withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
class Create extends Component {
 
	constructor(props) {
        super(props);
	this.count = 0;
        this.state = {
            name: '',
            sigid: '', 
            major: '', 
            units: '',
	showComponent:false,
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
                Name:
                <input id="name" type="text" name="name" onChange={this.handleChange}/>
            </label>
        <br />
            Signature ID:
            <input id="sigid"  type="text" name="sigid" onChange={this.handleChange}/>
        <br />
            Major:
             <select id="major" name="major" defaultValue={this.state.selectValue} onChange={this.handleChange} >	
		        <option value="-1"> Major </option>
            <option value="0">Aerospace</option>
            <option value="1">Biomedical</option>
            <option value="2">Bioengineering</option>
		        <option value="3">Chemical</option>
            <option value="4">Civil</option>
            <option value="5">Computer</option>
		        <option value="6">Electrical</option>
            <option value="7">Industrial</option>
            <option value="8">Mechanical</option>
            <option value="9">Software</option>

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
    console.log(event.target.value);
    this.setState({
        [event.target.name]:event.target.value
	});
  }

  handleSubmit(event) {
	this.count += 1;	
//	console.log("this is count" + this.count);
    alert('A name was submitted: ' + this.state.name);
    console.log(this.state.name + "where is this");
    event.preventDefault();
  }
}
export default withRouter(Create);
