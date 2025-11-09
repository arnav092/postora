// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// ✅ Your Firebase configuration (copied from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyA1NYYmzWtAkzdcs-U4Zbb3fKV_r7-DbQI",
  authDomain: "postora-092.firebaseapp.com",
  projectId: "postora-092",
  storageBucket: "postora-092.firebasestorage.app",
  messagingSenderId: "882301412763",
  appId: "1:882301412763:web:2953dd30b8113c25f46d3e",
  measurementId: "G-4R7YV2EKLC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
