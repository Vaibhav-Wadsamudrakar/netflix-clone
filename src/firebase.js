import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaXbqtTfBHOtdR4VovMy2dl57ytf6PumU",
  authDomain: "netflix-clone-649b0.firebaseapp.com",
  projectId: "netflix-clone-649b0",
  storageBucket: "netflix-clone-649b0.appspot.com",
  messagingSenderId: "374553570936",
  appId: "1:374553570936:web:c3be8914607768b6e7c78d",
  measurementId: "G-D2HWYX13TP"
};


const firebasseApp = firebase.initializeApp(firebaseConfig);
const db = firebasseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
