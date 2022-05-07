import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDWvpLMFvD-P47eR94u2uFWf9wqDE3-z5Q",
    authDomain: "fuzzle-53002.firebaseapp.com",
    projectId: "fuzzle-53002",
    storageBucket: "fuzzle-53002.appspot.com",
    messagingSenderId: "859107978798",
    appId: "1:859107978798:web:c35a1033fa072b55d7f9bf"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;