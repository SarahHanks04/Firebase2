// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAG0ulZXRhn44d0wlvg0WWBHyHg8TCbjGI",
//   authDomain: "echohub-dashboard.firebaseapp.com",
//   projectId: "echohub-dashboard",
//   storageBucket: "echohub-dashboard.firebasestorage.app",
//   messagingSenderId: "783160043366",
//   appId: "1:783160043366:web:a876fb01116fadd31a4aa7",
//   measurementId: "G-0J4CKYVBCS",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp-VicJgATE2PIEDg9CfeeLTCiwwwDbas",
  authDomain: "echohub-form.firebaseapp.com",
  projectId: "echohub-form",
  storageBucket: "echohub-form.firebasestorage.app",
  messagingSenderId: "93743200642",
  appId: "1:93743200642:web:8620ef82db2972172fb79b",
  measurementId: "G-7T7064WPM3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);