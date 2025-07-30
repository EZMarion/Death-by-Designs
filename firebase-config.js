import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔒 Paste your Firebase config below
const firebaseConfig = {
  apiKey: "AIzaSyDffoLenAKrKGMia63SDWTFt5E4AK3hxBE",
  authDomain: "novel-site-81674.firebaseapp.com",
  projectId: "novel-site-81674",
  storageBucket: "novel-site-81674.firebasestorage.app",
  messagingSenderId: "227276404115",
  appId: "1:227276404115:web:0a5831851c8c05391b6466"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };