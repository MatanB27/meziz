import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBC7ZKIuzBdSi7ABP1igonw0XWKnISUCjU",
  authDomain: "fuzzle-4b549.firebaseapp.com",
  projectId: "fuzzle-4b549",
  storageBucket: "fuzzle-4b549.appspot.com",
  messagingSenderId: "217885208163",
  appId: "1:217885208163:web:f8d305457a5943eaed9256"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase;