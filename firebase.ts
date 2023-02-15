import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1gOemX0ceXpwHx1GqKVXdwKOe8cJAWMM",
  authDomain: "chatgpt-messenger-74c90.firebaseapp.com",
  projectId: "chatgpt-messenger-74c90",
  storageBucket: "chatgpt-messenger-74c90.appspot.com",
  messagingSenderId: "239575554495",
  appId: "1:239575554495:web:44095534e2690abed9e90a",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
