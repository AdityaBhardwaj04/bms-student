// Firebase setup
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCaB_sUnlX9FWesmAsYgpgaAo7Zcp_TfTM",
    authDomain: "student-data-1d981.firebaseapp.com",
    projectId: "student-data-1d981",
    storageBucket: "student-data-1d981.appspot.com",
    messagingSenderId: "783783332569",
    appId: "1:783783332569:web:77eda645c98cfefba18cc8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);