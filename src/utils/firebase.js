import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYeGc522QV1uCekquAJgSfnpqvtD3aMxE",
    authDomain: "ecommerce-react-909.firebaseapp.com",
    projectId: "ecommerce-react-909",
    storageBucket: "ecommerce-react-909.appspot.com",
    messagingSenderId: "1094602015481",
    appId: "1:1094602015481:web:0c34516ebdfddf6aa5d828",
    measurementId: "G-F929K0QC4C"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }