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
      let data = this.state.certificate;
    if((keys.length != 0 &&
         data["name"] != '' &&
          data["surname"] != '' &&
           data["units"] != '' && 
           data["sigid"] != '' && 
           data["major"] != '')){
     //   console.log("yes");
        let majors = data["major"];
        let fname = data["name"];
        let lname = data["surname"];
        let units = data["units"];
        let sigid = data["sigid"]
        return (
            <div class="flex justify-center items-center h-screen" >
            <div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">
          <h1 class=" font-fancy font-bold text-lg text-white mb-4 pl-16 text-3xl "> Edit Certificate </h1>
        <form onSubmit={this.handleSubmit}>
                <div class="flex justify-center col-md-6 items-center">
                    <p class="text-white font-fancy font-bold text-lg">First Name:</p>
                    <input class="shadow ml-12 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" defaultValue={fname} onChange={this.handleChange}/>
                    </div>
                    <div class="flex justify-center col-md-6 items-center">
                    <p class="text-white font-fancy font-bold text-lg">Last Name:</p>
                    <input class="shadow ml-13 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text" name="surname" defaultValue={lname} onChange={this.handleChange}/>
                    </div>
                    <div class="flex justify-center col-md-6 items-center">
                    <p class="text-white font-fancy font-bold text-lg">Signature ID:</p>
                    <input class="shadow ml-11 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="sigid"  type="text" name="sigid" defaultValue={sigid} onChange={this.handleChange}/>
                    </div>
            <div class="flex justify-left pl-4 col-md-6 items-center ">
                <p class="text-white font-fancy font-bold text-lg mr-16">Major:</p>
                
                 <select class="block ml-6 h-8 w-24 pl-4 font-fancy font-bold appearance-none bg-whiteborder border-purple-lighter text-grey-darker ml-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"  id="major" name="major" defaultValue={majors} value={majors} onChange={this.handleChange} >	
                 <option value="BS Aerospace Engineering">Aerospace</option>
            <option value="BS Biomedical Engineering">Biomedical</option>
            <option value="BS Bioengineering Engineering">Bioengineering</option>
		        <option value="BS Chemical Engineering">Chemical</option>
            <option value="BS Civil Engineering">Civil</option>
            <option value="BS Computer Engineering">Computer</option>
		        <option value="BS Electrical Engineering">Electrical</option>
            <option value="BS Industrial Engineering">Industrial</option>
            <option value="BS Mechanical Engineering">Mechanical</option>
            <option value="BS Software Engineering">Software </option>
    
              </select>
              </div>
            <div class="flex justify-center col-md-6 items-center">
                    <p class="text-white font-fancy font-bold text-lg">Units Completed:</p>
                    <input class="shadow ml-2 mt-2 mb-2 appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="units" type="text" name="units" defaultValue={units} onChange={this.handleChange}/>
                    </div>
            <div class="pl-4">
            <button class="inline-block h-12 w-32 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 mr-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" type="button" onClick={() => this.backTrack()}> Cancel</button>
            <input class="inline-block h-12 w-32 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 mr-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" type="submit" value="Save" />
            </div>
        </form>
    
                  </div>
                  </div>
          );
    }
    else{
    return (
        <div class="flex justify-center items-center h-screen" >
        <div class="container-xl h-full mx-auto pt-24 bg-transparent rounded">
	  <h1 class=" font-fancy font-bold text-lg text-white mb-4 pl-16 text-3xl "> Edit Certificate </h1>
    <form onSubmit={this.handleSubmit}>
            <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">First Name:</p>
                <input class="shadow ml-12 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Last Name:</p>
                <input class="shadow ml-13 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                </div>
                <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Signature ID:</p>
                <input class="shadow ml-11 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="sigid"  type="text" name="sigid"  onChange={this.handleChange}/>
                </div>
        <div class="flex justify-left pl-4 col-md-6 items-center ">
            <p class="text-white font-fancy font-bold text-lg mr-16">Major:</p>
            
             <select class="block ml-6 h-8 w-24 pl-4 font-fancy font-bold appearance-none bg-whiteborder border-purple-lighter text-grey-darker ml-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"  id="major" name="major" value={this.state.major} onChange={this.handleChange} >	
            <option value="BS Aerospace Engineering">Aerospace</option>
            <option value="BS Biomedical Engineering">Biomedical</option>
            <option value="BS Bioengineering Engineering">Bioengineering</option>
		        <option value="BS Chemical Engineering">Chemical</option>
            <option value="BS Civil Engineering">Civil</option>
            <option value="BS Computer Engineering">Computer</option>
		        <option value="BS Electrical Engineering">Electrical</option>
            <option value="BS Industrial Engineering">Industrial</option>
            <option value="BS Mechanical Engineering">Mechanical</option>
            <option value="BS Software Engineering">Software </option>

          </select>
          </div>
        <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Units Completed:</p>
                <input class="shadow ml-2 mt-2 mb-2 appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="units" type="text" name="units" value={this.state.units} onChange={this.handleChange}/>
                </div>
        <div class="pl-4">
        <button class="inline-block h-12 w-32 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 mr-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" type="button" onClick={() => this.backTrack()}> Cancel</button>
        <input class="inline-block h-12 w-32 border-b-2 border-t-2 border-l-2 border-r-2 px-4 py-2 ml-2 mr-2 font-fancy font-bold text-lg leading-none border rounded bg-transparent text-white border-white hover:border-grey hover:text-grey mt-4 mb-4 lg:mt-0" type="submit" value="Save" />
        </div>
    </form>

              </div>
              </div>
    );
  }
}
  handleChange(event) {
   // console.log("doing stuff");
    console.log(event.target.value);
    var certificate = this.state.certificate;
    certificate[event.target.name] = event.target.value;
    this.setState({
        certificate
	});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    entry().update({"certificate":this.state.certificate}).then(function() {
		alert("Edited certificate");
  });
  this.backTrack();
  }
}
export default withRouter(Edit);
