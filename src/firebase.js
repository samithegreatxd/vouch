// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // ✅ add this

const firebaseConfig = {
  apiKey: "AIzaSyBUjzqjWtze58x8XXiowQS7vI9idE3hKoc",
  authDomain: "vouch-65071.firebaseapp.com",
  projectId: "vouch-65071",
  storageBucket: "vouch-65071.appspot.com",
  messagingSenderId: "912351573847",
  appId: "1:912351573847:web:4326fb6474e55b8392f012",
  measurementId: "G-PGJVD1FQTH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// ✅ initialize Realtime Database
const db = getDatabase(app);

export { app, analytics, auth, provider, storage, db };