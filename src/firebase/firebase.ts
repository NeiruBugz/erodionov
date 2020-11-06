import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyDI4e4_az8paWnOosvGgb_esKFNBP3-OsE",
	authDomain: "erodionov-courses.firebaseapp.com",
	databaseURL: "https://erodionov-courses.firebaseio.com",
	projectId: "erodionov-courses",
	storageBucket: "erodionov-courses.appspot.com",
	messagingSenderId: "82016601246",
	appId: "1:82016601246:web:1e39e15da8d0f6b454e78f"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export {
	firebase, db
};
