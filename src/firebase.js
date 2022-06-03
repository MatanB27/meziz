import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import {isSameDate} from './local-storage'
import {convertStringToArray, buildJson} from './functions';

const firebaseConfig = {
  apiKey: "AIzaSyBC7ZKIuzBdSi7ABP1igonw0XWKnISUCjU",
  authDomain: "fuzzle-4b549.firebaseapp.com",
  projectId: "fuzzle-4b549",
  storageBucket: "fuzzle-4b549.appspot.com",
  messagingSenderId: "217885208163",
  appId: "1:217885208163:web:f8d305457a5943eaed9256"
};


//TODO: USE ONLY WHEN I NEED TO ADD NEW WORDS!
export function addNewWords() {
  const MAX = 365;

  const today = new Date();
  const tomorrow = new Date(today);
  const db = firebase.firestore();
  const words = db.collection('words');
  for(let i = 0; i < MAX; i++){
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDate = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
    
    fetch(
            "https://random-word-api.herokuapp.com/word")
                .then((res) => res.json())
                .then((data) => {
                    const payload = {[data[0]]: nextDate}
                    words.add(payload);
        })
  }
}

// Getting a random word
// We are checking the word that match with the current date
export function getNewWordWithFirebase(setCurrentWord, setJsonWord) {

  const today = new Date();
  const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
  const db = firebase.firestore();
  const words = db.collection('words');

  let foundWord = false;
  words.onSnapshot((query) => {
    query.forEach((doc) => {
        const object = doc.data();
        const word = Object.keys(object)[0];
        const date = Object.values(object)[0];

        if(isSameDate(currentDate, date)) {
          setCurrentWord(word);
          setJsonWord(buildJson(convertStringToArray(word)));
          foundWord = true;
        }

        if(foundWord) {
          return false;
        }

    })
  })
}

  firebase.initializeApp(firebaseConfig);

  export default firebase;