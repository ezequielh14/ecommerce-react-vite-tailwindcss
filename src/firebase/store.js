// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6_5YpfilXmCTzS2DxBuItMlZ0CLEGPvQ",
    authDomain: "ecommerce-chkp4.firebaseapp.com",
    projectId: "ecommerce-chkp4",
    storageBucket: "ecommerce-chkp4.appspot.com",
    messagingSenderId: "853878538518",
    appId: "1:853878538518:web:a56cb864404a1ac12e5037",
    measurementId: "G-FD9YVFMCRE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
