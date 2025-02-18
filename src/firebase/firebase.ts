// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA0U4VgKLhe5qytyVWIBIksAxNuNyQhA5c",
	authDomain: "habit-tracker-fcad1.firebaseapp.com",
	projectId: "habit-tracker-fcad1",
	storageBucket: "habit-tracker-fcad1.firebasestorage.app",
	messagingSenderId: "911673735073",
	appId: "1:911673735073:web:305d1f105a569cfffe3de0",
	measurementId: "G-EEG0ELEL72",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore()

export {
	auth,
	googleProvider,
	db,
	createUserWithEmailAndPassword,
	signInWithPopup,
	signInWithEmailAndPassword,
	signOut,
}
