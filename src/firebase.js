import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtbNnNibLkSVqYQ1asDWCLLnV3_g5v4to",
    authDomain: "alethia-cf054.firebaseapp.com",
    databaseURL: "https://alethia-cf054.firebaseio.com",
    projectId: "alethia-cf054",
    storageBucket: "alethia-cf054.appspot.com",
    messagingSenderId: "745125968619"
  };

export const firebaseApp = firebase.initializeApp(config);
