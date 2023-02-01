import firebase from  "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD5dtEVj1c3mRCX8G0INOruQZIGJweutq4",
    authDomain: "wuri-81154.firebaseapp.com",
    projectId: "wuri-81154",
    storageBucket: "wuri-81154.appspot.com",
    messagingSenderId: "1088210734631",
    appId: "1:1088210734631:web:25dd0797b150e2b8124802"
  };
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);