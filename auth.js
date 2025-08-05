import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDffoLenAKrKGMia63SDWTFt5E4AK3hxBE",
  authDomain: "novel-site-81674.firebaseapp.com",
  projectId: "novel-site-81674",
  storageBucket: "novel-site-81674.appspot.com",
  messagingSenderId: "227276404115",
  appId: "1:227276404115:web:0a5831851c8c05391b6466"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Save Chapter Purchase to Firestore
async function savePurchase(userId, chapterId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const purchases = data.purchased || [];
    if (!purchases.includes(chapterId)) {
      purchases.push(chapterId);
      await setDoc(userRef, { purchased: purchases }, { merge: true });
    }
    alert("Chapter purchased successfully!");
  } else {
    console.error("User not found in Firestore");
  }
}

// ✅ Signup Function
function signup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Set Firebase Auth displayName
      await updateProfile(user, { displayName: name });

      // Save user data to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        joinDate: new Date().toISOString().split('T')[0],
        purchased: [],
        reading: []
      });

      alert("Signup successful!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Signup failed: " + error.message);
    });
}

// ✅ Login Function
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      // If user data doesn't exist in Firestore, save it from Firebase Auth
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "Anonymous",
          email: user.email,
          joinDate: new Date().toISOString().split('T')[0],
          purchased: [],
          reading: []
        });
      }

      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
}

// ✅ Auto-create Firestore doc if user is logged in and data missing
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "Anonymous",
        email: user.email,
        joinDate: new Date().toISOString().split('T')[0],
        purchased: [],
        reading: []
      });
    }
  }
});

// ✅ Logout Function
function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Logout error: " + error.message);
    });
}

// ✅ Expose functions globally
window.login = login;
window.signup = signup;
window.logout = logout;
window.savePurchase = savePurchase;
