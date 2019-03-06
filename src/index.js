import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch, Redirect } from 'react-router-dom';
import Login from "./login";
import RegisterForm from "./signUp";
import {firebaseApp} from "./firebase";
import { createBrowserHistory } from 'history';
import Error from "./Error";

import CreateCert from "./CreateCert"


import createPage from "./createPage";
import Profile from "./profilepage";
import Verify from "./verifypage";
import Edit from "./editPage";

const browserHistory = createBrowserHistory()
firebaseApp.auth().onAuthStateChanged(user => {
    if(user){
        console.log('user signed in or up', user);
         if(window.location.pathname == "/login")
             browserHistory.push('/');
    } else{
        console.log('user has signed out or still needs to sign in');
        if(window.location.pathname != "/signup" || window.location.pathname != "/login")
            browserHistory.replace('/' );
    }
})
function PrivateRoute({ component: Component, ...rest }) {
    console.log("HELLO", firebaseApp.auth().currentUser);
    return (
      <Route
        {...rest}
        render={props =>

          firebaseApp.auth().currentUser != null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
ReactDOM.render(
    <Router path="/App" history={browserHistory}>
    <Switch>
    <Route exact path = '/' component ={App}  />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signUp' component={RegisterForm}/>
<<<<<<< HEAD
    <PrivateRoute exact path='/create' component={createPage}/>
	<PrivateRoute exact path='/profile' component={Profile}/>	
    <PrivateRoute exact path='/verify' component={Verify}/>	
    <PrivateRoute exact path='/profile/editCert' component={Edit}/>
=======
    <Route exact path='/create' component={createPage}/>
	<Route exact path='/profile' component={Profile}/>	
    <Route exact path='/verify' component={Verify}/>	
    <Route exact path='/profile/editCert' component={Edit}/>

>>>>>>> 20b0f4724cc7ca15bd3344ef7c4a15b21facb992
    <Route component={Error}/>
    </Switch>
    </Router>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
