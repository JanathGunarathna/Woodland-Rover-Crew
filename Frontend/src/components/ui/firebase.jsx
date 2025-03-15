import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// ... other firebase imports and initialization ...

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACa_FZDQg7uh7ELGXoChZ7H61yr0UGgJg",
    authDomain: "woodland-rover.firebaseapp.com",
    projectId: "woodland-rover",
    storageBucket: "woodland-rover.firebasestorage.app",
    messagingSenderId: "272296717524",
    appId: "1:272296717524:web:f96a666bc42b20d1185f41",
    measurementId: "G-N658TJ1XEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;