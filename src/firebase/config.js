import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyATgGWr3xDE4Ri-QoxDf0vAS1VamRLXK3s",
    authDomain: "kanu-d66f8.firebaseapp.com",
    databaseURL: "https://kanu-d66f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kanu-d66f8",
    storageBucket: "kanu-d66f8.appspot.com",
    messagingSenderId: "286528072944",
    appId: "1:286528072944:web:58b3463502f8dca8dc6635",
    measurementId: "G-KQLZFCHT1Y"
  };
 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };