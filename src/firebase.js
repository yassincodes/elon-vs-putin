// started a react project
// started a firebase project + database in test mode
// set up my react by deleting ...
// added firebase + made a firebase file called firebase.js

import firebase from "firebase/compat/app";
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyCYlV4xapARJUNOTwiqe0ojYw8PJj4-bm4",
    authDomain: "elon-vs-putin.firebaseapp.com",
    projectId: "elon-vs-putin",
    storageBucket: "elon-vs-putin.appspot.com",
    messagingSenderId: "840475121195",
    appId: "1:840475121195:web:bd57fb2c8d5c1831053c6e",
    measurementId: "G-ZRSKEY54JY",
    databaseURL: "https://elon-vs-putin-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase