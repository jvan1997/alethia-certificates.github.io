import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sigid: '', 
            major: '', 
            units: ''
        };
	this.majorData = [
    	{ value: 'USA', name: 'USA' },
    	{ value: 'CANADA', name: 'CANADA' }            
];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  
  render() {
    return (
      <div className="App">
        <header className="App-header">
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
             <select
	 id="major"
	 name="major"
         defaultValue={this.state.selectValue} 
         onChange={this.handleChange} 
         >	
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
            <input type="submit" value="Verify" />
    </form>
        </header>
              </div>
    );
  }
  handleChange(event) {
    console.log("doing stuff");
    console.log(event.target.value);
    this.setState({
        [event.target.name]:event.target.value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    console.log(this.state.name + "where is this");
    event.preventDefault();
  }
}

export default App;
