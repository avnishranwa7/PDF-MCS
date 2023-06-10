// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoa2alW7uOe3e8p_okxui2BBfB_hXudcM",
  authDomain: "pdf-mcs-c169a.firebaseapp.com",
  projectId: "pdf-mcs-c169a",
  storageBucket: "pdf-mcs-c169a.appspot.com",
  messagingSenderId: "935169902302",
  appId: "1:935169902302:web:7af244e8c026194a55a44f",
  measurementId: "G-R5LCL24XPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);