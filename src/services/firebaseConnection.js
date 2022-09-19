import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDO5Wy1oFipPOg5jbQE4b5Nd4qCw5MG7fc",
    authDomain: "customer-call-management-e039d.firebaseapp.com",
    projectId: "customer-call-management-e039d",
    storageBucket: "customer-call-management-e039d.appspot.com",
    messagingSenderId: "564642928575",
    appId: "1:564642928575:web:df3a2517c9bd6709bb330a",
    measurementId: "G-D6YJX7M1GV"
  };

  
if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

  
  
  