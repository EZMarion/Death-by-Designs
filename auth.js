const firebaseConfig = {
  apiKey: "AIzaSyDffoLenAKrKGMia63SDWTFt5E4AK3hxBE",
  authDomain: "novel-site-81674.firebaseapp.com",
  projectId: "novel-site-81674",
  storageBucket: "novel-site-81674.firebasestorage.app",
  messagingSenderId: "227276404115",
  appId: "1:227276404115:web:0a5831851c8c05391b6466"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();
function savePurchase(userId, chapterId) {
  database.ref('purchases/' + userId + '/' + chapterId).set(true)
    .then(() => {
      alert("Chapter purchased successfully!");
    })
    .catch((error) => {
      console.error("Error saving purchase:", error);
    });
}

const auth = firebase.auth();
