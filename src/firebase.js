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


// if needed
// const db = firebase.firestore();
        // const words = db.collection('words');
        //TODO: DONT USE! 
        // addNewWords(words);

        // getNewWordWithFirebase(words, setCurrentWord);


// Getting a random word
export function getNewWordWithFirebase(words, setCurrentWord) {
  words.onSnapshot((query) => {
    const MAX_NUMBER = query.size;
    const MIN_NUMBER = 0;
    const randomNumber = parseInt(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
    let i = 0;
    query.forEach(doc => {
      i++;
      if(i === randomNumber){
        console.log(doc.data());
      }
    })
  })
  // words.onSnapshot((query) => {
  //   query.forEach((doc) => {
  //       const word = doc.data();
  //       console.log(word);
  //     })
  //   })
}

  firebase.initializeApp(firebaseConfig);

  export default firebase;