import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV1--GzvPKHji3tLfwudnPMOVA1CBCDQ0",
  authDomain: "neuro-heart.firebaseapp.com",
  projectId: "neuro-heart",
  storageBucket: "neuro-heart.firebasestorage.app",
  messagingSenderId: "583445886660",
  appId: "1:583445886660:web:cdd5a60c20fbaaf7977b91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default firebaseConfig;