const firebaseConfig = {
  apiKey: "AIzaSyDffoLenAKrKGMia63SDWTFt5E4AK3hxBE",
  authDomain: "novel-site-81674.firebaseapp.com",
  projectId: "novel-site-81674",
  databaseURL: "https://novel-site-81674-default-rtdb.firebaseio.com",
  storageBucket: "novel-site-81674.firebasestorage.app",
  messagingSenderId: "227276404115",
  appId: "1:227276404115:web:0a5831851c8c05391b6466"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ✅ Save purchase to Realtime Database
function savePurchase(userId, chapterId) {
  database.ref(`purchases/${userId}/${chapterId}`).set(true)
    .then(() => {
      alert("Chapter purchased successfully!");
    })
    .catch((error) => {
      console.error("Error saving purchase:", error);
    });
}

// ✅ Auto-save user profile if not already saved
auth.onAuthStateChanged(user => {
  if (user) {
    const userId = user.uid;
    const userRef = database.ref(`users/${userId}`);

    userRef.once('value').then(snapshot => {
      if (!snapshot.exists()) {
        userRef.set({
          name: user.displayName || "Anonymous",
          email: user.email || "",
          joinDate: new Date().toISOString().split('T')[0],
          purchases: {},
          reading: {}
        });
      }
    });
  }
});

