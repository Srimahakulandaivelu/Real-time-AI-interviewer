// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9P98h3z3bgMDfp9c6z9lXWmb6QYbPNJE",
    authDomain: "interview-assistant-prepwise.firebaseapp.com",
    projectId: "interview-assistant-prepwise",
    storageBucket: "interview-assistant-prepwise.firebasestorage.app",
    messagingSenderId: "339652235637",
    appId: "1:339652235637:web:638e50597910fe4bcbc33c",
    measurementId: "G-F9RF5SZ7HQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);