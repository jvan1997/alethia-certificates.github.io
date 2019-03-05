import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch } from 'react-router-dom';
import Login from "./login";
import RegisterForm from "./signUp";
import {firebaseApp} from "./firebase";
import { createBrowserHistory } from 'history';
import Error from "./Error";
import Logout from "./logout";
import CreateCert from "./CreateCert"

const browserHistory = createBrowserHistory()
firebaseApp.auth().onAuthStateChanged(user => {
    if(user){
        console.log('user signed in or up', user);
         if(window.location.pathname == "/login")
             browserHistory.push('/');
    } else{
        console.log('user has signed out or still needs to sign in');
        if(window.location.pathname != "/signup")
            browserHistory.replace('/login' );
    }
})
ReactDOM.render(
    <Router path="/App" history={browserHistory}>
    <Switch>
    <Route exact path = '/' component ={App}  />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signUp' component={RegisterForm}/>
    <Route exact path='/logout' component={Logout}/>
    <Route exact path='/create' component={CreateCert} />
    <Route component={Error}/>
    </Switch>
    </Router>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
