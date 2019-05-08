import {firebaseApp} from './firebase'
/**
 * Gets the current user of the firebase login.
 */
export const user = () => {
    return firebaseApp.auth().currentUser;
};
/**
 * Gets the database of users.
 */
export const db = () => { 
    return firebaseApp.firestore().collection('users');
};
/**
 * Gets the information of the current user from the database.
 */
export const entry = () => { 
    return db().doc(user().email);
}