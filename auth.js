const firebaseConfig = {
  apiKey: "AIzaSyDffoLenAKrKGMia63SDWTFt5E4AK3hxBE",
  authDomain: "novel-site-81674.firebaseapp.com",
  projectId: "novel-site-81674",
  storageBucket: "novel-site-81674.appspot.com",
  messagingSenderId: "227276404115",
  appId: "1:227276404115:web:0a5831851c8c05391b6466",
  databaseURL: "https://novel-site-81674-default-rtdb.asia-southeast1.firebasedatabase.app"
  
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ✅ Save Chapter Purchase
function savePurchase(userId, chapterId) {
  database.ref(`users/${userId}/purchases/${chapterId}`).set(true)
    .then(() => {
      alert("Chapter purchased successfully!");
    })
    .catch((error) => {
      console.error("Error saving purchase:", error.message);
    });
}

// ✅ Auto-save user profile on login/signup
auth.onAuthStateChanged(user => {
  if (user) {
    const userRef = database.ref('users/' + user.uid);
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

// ✅ Login Function
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      const userRef = database.ref('users/' + uid);
      return userRef.once('value').then(snapshot => {
        if (!snapshot.exists()) {
          return userRef.set({
            name: "Anonymous",
            email: userCredential.user.email,
            joinDate: new Date().toISOString().split('T')[0],
            purchases: {},
            reading: {}
          });
        }
      }).then(() => {
        alert("Login successful!");
        window.location.href = "index.html";
      });
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
}

function signup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // Step 1: Set displayName in Auth profile
      return user.updateProfile({ displayName: name })
        .then(() => {
          // Step 2: Save to Realtime Database
          return database.ref("users/" + user.uid).set({
            name: name,
            email: email,
            joinDate: new Date().toISOString().split('T')[0],
            purchases: {},
            reading: {}
          });
        });
    })
    .then(() => {
      alert("Signup successful!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Signup failed: " + error.message);
    });
}



// ✅ Logout Function
function logout() {
  auth.signOut()
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html"; // or "login.html"
    })
    .catch(error => {
      alert("Logout error: " + error.message);
    });
}







