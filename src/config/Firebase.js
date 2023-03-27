import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLKXZNI4Qf4W1tQ4YP0lIOZiEC_8fYTH4",
  authDomain: "react-to-do-14de5.firebaseapp.com",
  projectId: "react-to-do-14de5",
  storageBucket: "react-to-do-14de5.appspot.com",
  messagingSenderId: "888693698547",
  appId: "1:888693698547:web:29733d446267c121186c86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);