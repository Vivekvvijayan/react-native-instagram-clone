
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAFzR_rRpuqkQ5wj7O7tSqTU_Ud7StptDY",
  authDomain: "instagram-app-clone-3e4ca.firebaseapp.com",
  projectId: "instagram-app-clone-3e4ca",
  storageBucket: "instagram-app-clone-3e4ca.appspot.com",
  messagingSenderId: "736260007552",
  appId: "1:736260007552:web:ffdb5da8bdfbaaee30e865",
  measurementId: "G-9D2587EK45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)