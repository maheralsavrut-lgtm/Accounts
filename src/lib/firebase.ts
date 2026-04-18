import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKk5oIaE1LYOmoYMd2t6PnitXwXxHTSl4",
  authDomain: "black-box-c4847.firebaseapp.com",
  projectId: "black-box-c4847",
  storageBucket: "black-box-c4847.firebasestorage.app",
  messagingSenderId: "824717519714",
  appId: "1:824717519714:web:5e18e347319cb337045a3b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
