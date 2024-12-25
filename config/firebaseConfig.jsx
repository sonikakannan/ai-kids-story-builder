// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-kids-story-53edd.firebaseapp.com",
  projectId: "ai-kids-story-53edd",
  storageBucket: "ai-kids-story-53edd.firebasestorage.app",
  messagingSenderId: "287814737284",
  appId: "1:287814737284:web:29edc09524567e36a651d1",
  measurementId: "G-9C76LHYE2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)