import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch } from 'react-router-dom';
import Login from "./login";
import RegisterForm from "./signUp";
import { createBrowserHistory } from 'history';
import AboutPage from "./aboutPage";

import createPage from "./createPage";
import Profile from "./profilepage";
import VerifyPage from "./verifypage";
import Edit from "./editPage";
import Vote from "./votePage";
const browserHistory = createBrowserHistory()
// firebaseApp.auth().onAuthStateChanged(user => {
    let test = JSON.parse(localStorage.getItem("logged"));
    if(test){
         if(window.location.pathname === "/login" || window.location.pathname ==='/signup')
             browserHistory.push('/');
    } else{
        if(window.location.pathname !== "/signup" && window.location.pathname !== "/login" && window.location.pathname!=="/about")
            browserHistory.replace('/' );
    }
// })
ReactDOM.render(
    <Router path="/App" history={browserHistory}>
    <Switch>
    <Route exact path = '/' component ={App}  />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signUp' component={RegisterForm}/>
    <Route exact path='/create' component={createPage}/>
	<Route exact path='/profile' component={Profile}/>	
    <Route exact path='/verify' component={VerifyPage}/>	
    <Route exact path='/profile/editCert' component={Edit}/>
    <Route exact path='/about' component={AboutPage}/>
    <Route exact path='/vote' component={Vote}/>

    <Route component={App}/>
    </Switch>
    </Router>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
