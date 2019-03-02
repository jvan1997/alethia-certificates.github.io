import {firebaseApp} from './firebase'

export const user = () => {
//    console.log("What:" + auth.currentUser.email);
    return firebaseApp.auth().currentUser;
};
export const db = () => { 
    return firebaseApp.firestore().collection('users');
};
export const entry = () => { 
    return db().doc(user().email);
}