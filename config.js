import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBizeaXwC4hDL6wIcTonrCsxzTKwM9m7z0",
    authDomain: "study-873ba.firebaseapp.com",
    projectId: "study-873ba",
    storageBucket: "study-873ba.appspot.com",
    messagingSenderId: "179517585451",
    appId: "1:179517585451:web:ba3107a21a098d1331926e",
    measurementId: "G-TDVSF2P5G8"
};
  

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};