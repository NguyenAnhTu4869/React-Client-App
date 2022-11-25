import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// Firebase configuration for web app
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'itshop-login.firebaseapp.com',
	projectId: 'itshop-login',
	storageBucket: 'itshop-login.appspot.com',
	messagingSenderId: '383118662012',
	appId: '1:383118662012:web:201bae9eff40c4352c2cf9',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
