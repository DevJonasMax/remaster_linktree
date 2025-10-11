import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmEAQhW82oiCJuK0u4kZuE7lr8loAWlTc",
    authDomain: "linktreecopy.firebaseapp.com",
    projectId: "linktreecopy",
    storageBucket: "linktreecopy.firebasestorage.app",
    messagingSenderId: "458281204211",
    appId: "1:458281204211:web:6dc8b1f167e878bddafa86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
