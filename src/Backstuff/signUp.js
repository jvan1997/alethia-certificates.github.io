import {firebaseApp} from "./firebase";
import React from 'react';
function user() {
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}
function SignUp(){
        console.log('In Sign UP Method: The state:', this.state);
        const {name,email, password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password)
            .catch(error => {
                this.setState({error})
            });
        console.log("This is the name and email in SignUP" + name + " " + email + " ");
                
}
render() {
        return(	<Input size="sm" label="Your name" icon="user" group type="name"
                                       validate error="wrong" success="right"
                                       onChange ={event => this.setState({name: event.target.value})}
                                />
                                <Input size="sm" label="Your email" icon="envelope" group type="email"
                                       validate error="wrong" success="right"
                                       onChange ={event => this.setState({email: event.target.value})}
                                />
                                <Input size="sm" label="Your password" icon="lock" group type="password"
                                       validate error="wrong" success="right"
                                />
                                <Input size="sm" label="Confirm your password" icon="exclamation-triangle"
                                       group type="password" validate error="wrong" success="right"
                                       onChange ={event => this.setState({password: event.target.value})}
                                />

                                <div className="form-check my-4">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck12" />
                                    <label htmlFor="defaultCheck12" className="grey-text">Accept the
                                        <a href="#" className="blue-text"> Terms and Conditions</a></label>
                                </div>

                                <div className="text-center mb-3">
                                        <Button color="btn btn-pink btn-block btn-rounded z-depth-1"
                                                rounded type="button" className="btn-block z-depth-1"

                                                onClick={() =>
                                                    this.SignUp()                                                }
                                        >Sign Up</Button>
                                </div>
                                <div>{this.state.error.message}</div>
		);
    }
