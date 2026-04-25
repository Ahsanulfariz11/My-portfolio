// src/firebase.js
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getDatabase } from "firebase/database";
=======
<<<<<<< HEAD
import { getDatabase } from "firebase/database";
=======
import { getFirestore } from "firebase/firestore";
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
<<<<<<< HEAD
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
=======
<<<<<<< HEAD
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
=======
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
<<<<<<< HEAD
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
=======
<<<<<<< HEAD
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
=======
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
// Initialize Realtime Database
const database = getDatabase(app);

export { database };
<<<<<<< HEAD
=======
=======
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
