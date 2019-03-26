import React, { Component } from 'react';
import logo from './Images/logo.png';
import './App.css';
import './index.css';
import {Router, Route, Link, RouteHandler,withRouter} from 'react-router-dom';
import {firebaseApp} from "./firebase";
import { Button} from 'react-bootstrap';
import Bar from './bar';
function user() {
//    console.log("What:" + auth.currentUser.email);
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
} 

var fileSelect;
var pdfjsLib;

class Create extends Component {
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.min.js";
    script.async = true;
    script.onload = this.pdfLibraryLoaded

    document.body.appendChild(script);
}
	constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname:'',
            sigid: '', 
            major: '', 
            units: '',
        };
	
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePDFSubmit = this.handlePDFSubmit.bind(this)
    }  
        backTrack(){
     	this.props.history.goBack();
     }
  render() {
    return (
      
        <div class="bg-cover-image  h-screen" >
        <Bar />
        <div class="flex items-center container-xl h-full mx-auto pt-24 bg-transparent rounded">
	  <h1> Create Certificate </h1>
          <img src={logo} alt="Logo" />
          <p>
            Issue and Verify digital certificates with Ethereum Smart Contracts
          </p>
    <form onSubmit={this.handleSubmit}>
            <label>
                First Name:
                <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                <br />
                Last Name:
                <input id="surname" type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
            </label>
        <br />
            Signature ID:
            <input id="sigid"  type="text" name="sigid"  onChange={this.handleChange}/>
        <br />
            Major:
             <select id="major" name="major" value={this.state.major} onChange={this.handleChange} >	
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
            <option value="BS Software Engineering">BS Software Engineering</option>

          </select>
        <br />
            Units Completed:
            <input id="units" type="text" name="units" value={this.state.units} onChange={this.handleChange}/>
        <br />
	    <Button onClick={() => this.backTrack()}> Cancel</Button>
            <input type="submit" value="Generate" />
           
    </form>

        <div>
            <form>
                <input type="file" name="file" onChange={this.handlePDFSubmit } />
                <br />
                
            </form>
            </div>

              </div>
              </div>
    );
  }
  handleChange(event) {
   // console.log("doing stuff");
    //console.log(event.target.value);
    this.setState({
        [event.target.name]:event.target.value
	});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event)
    let relevantState = { 
        "name": this.state.name,
        "surname": this.state.surname,
        "sigid": this.state.sigid,
        "major": this.state.major,
        "units": this.state.units
    }

    // https://stackoverflow.com/questions/49686694/uploading-a-file-using-fetch-in-reactjs
    let url = 'http://localhost:8080/check'
    let options = {
        method: 'post',
        headers: {},
        
    }
    options.body = new FormData();
    for (let key in relevantState) {
    options.body.append(key, relevantState[key]);
    }
    // https://stackoverflow.com/questions/38794180/fetch-data-with-react
    let check = ()=>{
        return fetch(url, options)
    }
    check().then((response)=>{
        console.log(response)
        console.log("abc")
      if (response.status == 200) {
        entry().update({"certificate":relevantState}).then(function() {
            alert("Created certificate");
        });
        this.backTrack();
      }
      if (response.status >= 400) {
        alert("Invalid sigid")
      }
    })



    

  }

  // PDF-related code

  handlePDFSubmit(ev){

        
    console.log(pdfjsLib)


    fileSelect = ev.currentTarget.files
    this.setState({file:ev.currentTarget.files[0]},
        ()=>{
            console.log(fileSelect)


            let reader = new FileReader()

            reader.onload = (e)=>{
                console.log(e.target.result)
                let data = e.target.result
                console.log(data)



    
                
                
               this.getPDFText(data)
               .then( (text) =>{
                console.log(`text is ${text}`)

                let strs = text.split("\n")
                console.log(strs)
                let name = ""
                let major = ""
                let units = 0

                let nameToken = "STUDENT NAME:"
                let majorToken = "MAJOR:"
                let unitsToken = "ALL COLLEGE:"

                for(var i=0;i<strs.length;i++){
                    if( strs[i].includes(nameToken)){
                        name = strs[i].split(nameToken)[1].trim()
                        console.log(name)
                        let nameComponents = name.split(" ")
                        let lastName = nameComponents[0].replace(",","")
                        let firstName = nameComponents[1]
                        this.setState({name:firstName, surname:lastName})
                    }
                    if( strs[i].includes(majorToken)){
                        major = strs[i].split(majorToken)[1].trim()
                        console.log(major)
                        this.setState({major:major})
                    }
                    if( strs[i].includes(unitsToken)){
                      units = strs[i].trim().split(/\s+/)
                      console.log(units)  
                  }

                }
                let totalUnits = units[4]
                this.setState({units:totalUnits})
               })
                
            
                
            }
            var file = fileSelect[0]
            console.log(file)
    
            console.log( `state.file is ${this.state.file}`)
            reader.readAsDataURL(this.state.file)
            
            

        })
    



    // open file and print to console

    // var fr = new FileReader()
    // fr.onload = (e)=> {
    //     var res = e.target.result
    //     console.log(res)
    // }

    // var txt = fr.readAsText(file)
    
}



  pdfLibraryLoaded(ev){
    pdfjsLib = window['pdfjs-dist/build/pdf']
    console.log('pdflibloaded')
    console.log(pdfjsLib)
}

/**
 * 
 * @param {*} data Is pdf read as data url
 */
async getPDFText(data){
    var loadingTask = pdfjsLib.getDocument(data);
    let pdf = await loadingTask.promise
    console.log(pdf)

    let pdfText = ''

    console.log(pdf.numPages)
    for(var i=1;i<=pdf.numPages;i++){
        let page = await pdf.getPage(i)
        // console.log(page)
        let textContent = await page.getTextContent()
        // console.log(textContent)

        pdfText = textContent.items.reduce( (acc,curr) => acc + curr.str +"\n", pdfText )
        // for( var j=0; j<textContent.items.length;j++){
        //     pdfText += textContent.items[j].str + "\n"
        // }
    }

    // console.log(pdfText)
    
    return pdfText
}



}
export default withRouter(Create);
