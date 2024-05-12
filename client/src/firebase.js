// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lexis-18c6c.firebaseapp.com",
  projectId: "lexis-18c6c",
  storageBucket: "lexis-18c6c.appspot.com",
  messagingSenderId: "425004594144",
  appId: "1:425004594144:web:11b5f10635d87d476bb185"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseapp);