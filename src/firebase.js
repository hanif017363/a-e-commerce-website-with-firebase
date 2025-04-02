// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9a955fjS1tpJxTKQDJBvADjc08SMuCdc",
  authDomain: "auth-flow-6425e.firebaseapp.com",
  projectId: "auth-flow-6425e",
  storageBucket: "auth-flow-6425e.firebasestorage.app",
  messagingSenderId: "827120127041",
  appId: "1:827120127041:web:90ef1962b929f456ed8ac0",
  measurementId: "G-4V993SP2F6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
