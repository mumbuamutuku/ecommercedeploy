// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc0pnGsV7rZ0Xd5NvQeXeoC1D2_EyC83g",
  authDomain: "blissful-d849f.firebaseapp.com",
  projectId: "blissful-d849f",
  storageBucket: "blissful-d849f.appspot.com",
  messagingSenderId: "244124909566",
  appId: "1:244124909566:web:7861e95d200b5784558aaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();