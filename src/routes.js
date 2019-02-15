import React from 'react';
/*eslint-enable no-unused-vars*/
import {Route, IndexRoute} from 'react-router';
import Login from "./login";
import RegisterForm from "./signUp";
class AssembliesRoutes extends React.Component{
render() {
    return (
    <Route component={Login} path='login'>
    <Route component={RegisterForm} path='signUp' />
    </Route>);
}
}