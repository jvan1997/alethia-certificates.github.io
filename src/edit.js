import React, { Component } from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import {entry} from './functions';
/**
 * Class edit is basically allowing the user to edit their certificate.
 */
class Edit extends Component {
	constructor(props) {
        super(props);
        this.state = {
            certificate:[],
            voted:[],
            loading:true,
        };
	
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * This function will be used a lot to allow the user to navigate to a previous page.
     */  
        backTrack(){
     	this.props.history.goBack();
     }
     /**
      * Checks if hte user is logged in or not, and gets the list of voters.
      */
     componentWillMount(){
        let test = JSON.parse(localStorage.getItem("logged"));
        if(!test){
            this.props.history.push('/');
        }
        this.authSubscription = firebaseApp.auth().onAuthStateChanged((user2) => {
        firebaseApp.firestore().collection('approved').doc('voted').get().then((doc) => {
          if (doc.exists) {
                    this.setState({voted:doc.data()['voted'], loading:false, currentUser:user2.email});
          } else {
            this.setState({ voted: null });
          }
          
        })
        });
      }
    /**
     * Gets the certificate information of the user.
     */
     componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                entry().get().then((doc) => {
                    if (doc.exists) {
                        let data = doc.data()['certificate'];
                        this.setState({ certificate: data });
                    } else {
                        this.setState({ data: null });
                    }
                })
            } else{

            }
        })
        
    }
    /**
     * Renders the information of the user's certificiate and allows them to change it.
     */
  render() {
      var keys = Object.keys(this.state.certificate);
      let data = this.state.certificate;
    if((keys.length !== 0 &&
         data["name"] !== '' &&
          data["surname"] !== '' &&
           data["units"] !== '' && 
           data["sigid"] !== '' && 
           data["major"] !== '')){
        let majors = data["major"];
        let fname = data["name"];
        let lname = data["surname"];
        let units = data["units"];
        let sigid = data["sigid"]
        return (
            <div class="flex justify-center items-center h-full" >
            <div class="container-xl mx-auto pt-24 bg-transparent rounded">
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
                    <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Institution:</p>
                <input class="shadow ml-14 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="institution"  type="text" name="institution"  onChange={this.handleChange}/>
                </div>
                <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Approval Date:</p>
                <input class="shadow ml-8 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="date"  type="text" name="date"  onChange={this.handleChange}/>
                </div>
            <div class="flex justify-left pl-4 col-md-6 items-center ">
                <p class="text-white font-fancy font-bold text-lg mr-16">Major:</p>
                
                <select class="block ml-6 h-8 w- pl-2 pr-1 font-fancy font-bold appearance-none bg-whiteborder border-purple-lighter text-black ml-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"  id="major" name="major" value={majors} onChange={this.handleChange} >	
		        <option value="-1"> Select </option>
                <option value="BS Aerospace Engineering">Aerospace Engineering</option>
            <option value="BS Biomedical Engineering">Biomedical Engineering</option>
            <option value="BS Bioengineering Engineering">Biomedical Engineering</option>
		        <option value="BS Chemical Engineering">Chemical Engineering</option>
            <option value="BS Civil Engineering">Civil Engineering</option>
            <option value="BS Computer Engineering">Computer Engineering</option>
		        <option value="BS Electrical Engineering">Electrical Engineering</option>
            <option value="BS Industrial Engineering">Industrial Engineering</option>
            <option value="BS Mechanical Engineering">Mechanical Engineering</option>
            <option value="BS Software Engineering">Software Engineering</option>

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
                <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Institution:</p>
                <input class="shadow ml-14 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="institution"  type="text" name="institution"  onChange={this.handleChange}/>
                </div>
                <div class="flex justify-center col-md-6 items-center">
                <p class="text-white font-fancy font-bold text-lg">Approval Year:</p>
                <input class="shadow ml-8 mt-2 mb-2 appearance-none font-fancy font-bold border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="date"  type="text" name="date"  onChange={this.handleChange}/>
                </div>
        <div class="flex justify-left pl-4 col-md-6 items-center ">
            <p class="text-white font-fancy font-bold text-lg mr-16">Major:</p>
            
            <select class="block ml-6 h-8 w- pl-2 pr-1 font-fancy font-bold appearance-none bg-whiteborder border-purple-lighter text-black ml-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"  id="major" name="major" value={this.state.major} onChange={this.handleChange} >	
		        <option value="-1"> Select </option>
                <option value="BS Aerospace Engineering">Aerospace Engineering</option>
            <option value="BS Biomedical Engineering">Biomedical Engineering</option>
            <option value="BS Bioengineering Engineering">Biomedical Engineering</option>
		        <option value="BS Chemical Engineering">Chemical Engineering</option>
            <option value="BS Civil Engineering">Civil Engineering</option>
            <option value="BS Computer Engineering">Computer Engineering</option>
		        <option value="BS Electrical Engineering">Electrical Engineering</option>
            <option value="BS Industrial Engineering">Industrial Engineering</option>
            <option value="BS Mechanical Engineering">Mechanical Engineering</option>
            <option value="BS Software Engineering">Software Engineering</option>

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
  let voted = this.state.voted;
  for (var i=voted.length-1; i>=0; i--) {
    if (voted[i] === this.state.currentUser) {
        voted.splice(i, 1);
        break;       //<-- Uncomment  if only the first term has to be removed
    }
  }
  firebaseApp.firestore().collection('approved').doc('voted').set({voted}).then((returns) =>{
    alert("Certificate has been updated, you must get your certificiate re-verified");
})
  this.backTrack();
  }
}
export default withRouter(Edit);
