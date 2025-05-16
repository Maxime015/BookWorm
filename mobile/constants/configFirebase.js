// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL:"https://mywallet-e237d-default-rtdb.firebaseio.com/",
    measurementId: "",
    apiKey: "AIzaSyCJADnMuKJuZmr_RxDlhA7eIJ6iuz9FKfo",
    authDomain: "mywallet-e237d.firebaseapp.com",
    projectId: "mywallet-e237d",
    storageBucket: "mywallet-e237d.appspot.com",
    messagingSenderId: "940333255943",
    appId: "1:940333255943:web:9631aeffd3c7280f1a89a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app); 

export {app, database, storage}