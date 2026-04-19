import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Black Box AI Studio - Firebase Configuration
// تم تحديث الـ authDomain لربط الهوية البصرية بالدومين الخاص
const firebaseConfig = {
  apiKey: "AIzaSyDKk5oIaE1LYOmoYMd2t6PnitXwXxHTSl4",
  authDomain: "accounts.bbtech.cloud", 
  projectId: "black-box-c4847",
  storageBucket: "black-box-c4847.firebasestorage.app",
  messagingSenderId: "824717519714",
  appId: "1:824717519714:web:5e18e347319cb337045a3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication and Database
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
