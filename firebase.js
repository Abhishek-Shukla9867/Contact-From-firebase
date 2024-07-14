// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}  from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLodJVusjTfntx0A9TXoZwpY9dPZM50i0",
  authDomain: "contact-from-9d17e.firebaseapp.com",
  projectId: "contact-from-9d17e",
  storageBucket: "contact-from-9d17e.appspot.com",
  messagingSenderId: "106407111268",
  appId: "1:106407111268:web:4092c95ab0caca43658d71"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);