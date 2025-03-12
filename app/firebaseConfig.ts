import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpLe1pD-er_U7t5QOnsPYBvF9AfPnl9AQ",
  authDomain: "earn-ton.firebaseapp.com",
  projectId: "earn-ton",
  storageBucket: "earn-ton.firebasestorage.app",
  messagingSenderId: "1080910098297",
  appId: "1:1080910098297:web:af556a1a557565e72d49a8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
