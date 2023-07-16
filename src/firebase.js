// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgLJMwviboDpPFQjdKl0fLQD8d9YkNjHo",
  authDomain: "team-chat-d6cc7.firebaseapp.com",
  projectId: "team-chat-d6cc7",
  storageBucket: "team-chat-d6cc7.appspot.com",
  messagingSenderId: "531099870457",
  appId: "1:531099870457:web:22eaf165400c69a101ee28",
  measurementId: "G-GGZDZC2MNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);