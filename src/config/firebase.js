import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG0ulZXRhn44d0wlvg0WWBHyHg8TCbjGI",
  authDomain: "echohub-dashboard.firebaseapp.com",
  projectId: "echohub-dashboard",
  storageBucket: "echohub-dashboard.firebasestorage.app",
  messagingSenderId: "783160043366",
  appId: "1:783160043366:web:a876fb01116fadd31a4aa7",
  measurementId: "G-0J4CKYVBCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
