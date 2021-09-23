// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbMg5hj4Areww41k4gfuqQLj5LKBeqZxc",
  authDomain: "clothing-e-commerce-db-f3d88.firebaseapp.com",
  projectId: "clothing-e-commerce-db-f3d88",
  storageBucket: "clothing-e-commerce-db-f3d88.appspot.com",
  messagingSenderId: "79405258452",
  appId: "1:79405258452:web:85988cf39541ce031e0d41",
  measurementId: "G-HT6N0TTX5X"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export all we need method
export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);