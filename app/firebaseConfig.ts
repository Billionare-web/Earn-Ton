import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAE4Vej2Aks4Kc2wnS18YX4JqqoDb89NJw",
    authDomain: "token-e25d1.firebaseapp.com",
    projectId: "token-e25d1",
    storageBucket: "token-e25d1.firebasestorage.app",
    messagingSenderId: "403076692423",
    appId: "1:403076692423:web:c99d5e74854015356841e2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
