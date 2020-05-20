import * as firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBheNPjqfLn7jGIKMLCaskHCOw6x3UHTeQ",
  authDomain: "censible-e7fcc.firebaseapp.com",
  databaseURL: "https://censible-e7fcc.firebaseio.com",
  projectId: "censible-e7fcc",
  storageBucket: "censible-e7fcc.appspot.com",
  messagingSenderId: "777008760330",
  appId: "1:777008760330:web:6702838b4eaaa6635cc1f3",
  measurementId: "G-83VP97DKTJ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
export default firebase;
