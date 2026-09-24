// ========================================
// HYDROSAFE - FIREBASE CONFIGURATION
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjwjNY_rR7xmJg8EexWOCG6yvQ_6N8tJA",
    authDomain: "hydrosafe1.firebaseapp.com",
    projectId: "hydrosafe1",
    storageBucket: "hydrosafe1.firebasestorage.app",
    messagingSenderId: "1043551331115",
    appId: "1:1043551331115:web:c7a30ad4f995e2d1b49b6e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication
const auth = getAuth(app);


// Export Firebase Authentication
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};