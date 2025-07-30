import { auth, db } from './firebase-config.js';
import { doc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function markChapterAsPurchased(chapterId) {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to buy this chapter.");
    return;
  }

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    purchases: arrayUnion(chapterId)
  }, { merge: true });

  alert("✅ You bought this chapter!");
  location.reload(); // reload page to show content
}