// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Mock implementations for when Firebase is not available
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: async () => {
    throw new Error("Auth not available in demo mode");
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error("Auth not available in demo mode");
  },
  signOut: async () => {},
};

const mockDb = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: () => false,
        data: () => null,
      }),
      set: async () => {},
    }),
  }),
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let auth;
let db;

try {
  // Only initialize Firebase if we have the required config
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } else {
    console.log("Firebase config missing, using mock implementation");
    auth = mockAuth;
    db = mockDb;
  }
} catch (error) {
  console.log("Firebase initialization failed, using mock implementation:", error);
  auth = mockAuth;
  db = mockDb;
}

export { auth, db };
