// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export function getFoldersCollection() {
  return collection(firestore, "folders");
}

export function getFilesCollection() {
  return collection(firestore, "files");
}

// Add a new document to the "folders" collection
export async function addFolder(name, parentId = "", userId = "", path = "") {
  try {
    const foldersCollection = getFoldersCollection();
    await addDoc(foldersCollection, {
      name: name,
      parentId,
      userId,
      path,
      createdAt: serverTimestamp(),
    });
    console.log("Folder added successfully!");
  } catch (error) {
    console.error("Error adding folder: ", error);
  }
}

export const auth = getAuth();

export default app;
