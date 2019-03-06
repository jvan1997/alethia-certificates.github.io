import React, { Component } from 'react';
import logo from './Images/logo.png';
import './App.css';
import {Router, Route, Link, RouteHandler,withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import {user,db,entry} from './functions';

class Edit extends Component {
	constructor(props) {
        super(props);
        this.state = {
            certificate:[]
        };
	
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  
        backTrack(){
     	this.props.history.goBack();
     }
     componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                entry().get().then((doc) => {
                    if (doc.exists) {
                        let data = doc.data()['certificate'];
                        this.setState({ certificate: data });
                      //  console.log("Document data:", data);
                    } else {
                        // doc.data() will be undefined in this case
                        this.setState({ data: null });
                     //   console.log("No such document!");
                    }
                })
            } else{

            }
        })
        
    }
  render() {
      var keys = Object.keys(this.state.certificate);
    if(keys.length){
     //   console.log("yes");
        var data = this.state.certificate;
        let majors = data["major"];
        let fname = data["name"];
        let lname = data["surname"];
        let units = data["units"];
        let sigid = data["sigid"]
        return (
            <div className="App">
              <header className="App-header">
            <h1> Edit Certificate </h1>
                <img src={logo} alt="Logo" />
                <p>
                  Issue and Verify digital certificates with Ethereum Smart Contracts
                </p>
          <form onSubmit={this.handleSubmit}>
                  <label>
                      First Name:
                      <input id="name" type="text" name="name" defaultValue={fname} onChange={this.handleChange}/>
                      <br />
                      Last Name:
                      <input id="surname" type="text" name="surname" defaultValue={lname} onChange={this.handleChange}/>
                  </label>
              <br />
                  Signature ID:
                  <input id="sigid"  type="text" name="sigid" value={sigid} onChange={this.handleChange}/>
              <br />
                  Major:
                   <select id="major" name="major" value={this.state.certificate["major"]} onChange={this.handleChange} >	
                      <option value="-1"> Major </option>
                  <option value="Aerospace">Aerospace</option>
                  <option value="Biomedical">Biomedical</option>
                  <option value="Bioengineering">Bioengineering</option>
                      <option value="Chemical">Chemical</option>
                  <option value="Civil">Civil</option>
                  <option value="Computer">Computer</option>
                      <option value="Electrical">Electrical</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Software">Software</option>
      
                </select>
              <br />
                  Units Completed:
                  <input id="units" type="text" name="units" defaultValue={units} onChange={this.handleChange}/>
              <br />
              <Button onClick={() => this.backTrack()}> Cancel</Button>
                  <input type="submit" value="Save" />
                 
          </form>
              </header>
      
                    </div>
          );
    }
    else{
    return (
      <div className="App">
        <header className="App-header">
	  <h1> Edit Certificate </h1>
          <img src={logo} alt="Logo" />
          <p>
            Issue and Verify digital certificates with Ethereum Smart Contracts
          </p>
    <form onSubmit={this.handleSubmit}>
            <label>
                First Name:
                <input id="name" type="text" name="name" onChange={this.handleChange}/>
                <br />
                Last Name:
                <input id="surname" type="text" name="surname" onChange={this.handleChange}/>
            </label>
        <br />
            Signature ID:
            <input id="sigid"  type="text" name="sigid" onChange={this.handleChange}/>
        <br />
            Major:
             <select id="major" name="major" defaultValue={this.state.selectValue} onChange={this.handleChange} >	
		        <option value="-1"> Major </option>
            <option value="Aerospace">Aerospace</option>
            <option value="Biomedical">Biomedical</option>
            <option value="Bioengineering">Bioengineering</option>
		        <option value="Chemical">Chemical</option>
            <option value="Civil">Civil</option>
            <option value="Computer">Computer</option>
		        <option value="Electrical">Electrical</option>
            <option value="Industrial">Industrial</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Software">Software</option>

          </select>
        <br />
            Units Completed:
            <input id="units" type="text" name="units" onChange={this.handleChange}/>
        <br />
	    <Button onClick={() => this.backTrack()}> Cancel</Button>
            <input type="submit" value="Save" />
           
    </form>
        </header>

              </div>
    );
  }
}
  handleChange(event) {
   // console.log("doing stuff");
  //  console.log(event.target.value);
  console.log(event.target.value);
  var certificate = this.state.certificate;
  certificate[event.target.name] = event.target.value;
  this.setState({
      certificate
  });
  }

  handleSubmit(event) {
    event.preventDefault();
    entry().update({"certificate":this.state.certificate}).then(function() {
		alert("Edited certificate");
  });
  this.backTrack();
  }
}
export default withRouter(Edit);
