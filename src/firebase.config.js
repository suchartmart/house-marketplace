// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestor, getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmIdV3KqAy5pQRXQXDUsgawQlMD2uMrsU",
  authDomain: "itpweb-2cccd.firebaseapp.com",
  projectId: "itpweb-2cccd",
  storageBucket: "itpweb-2cccd.appspot.com",
  messagingSenderId: "646851145822",
  appId: "1:646851145822:web:7561c2f1d0e3c1bcf4c4cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();
