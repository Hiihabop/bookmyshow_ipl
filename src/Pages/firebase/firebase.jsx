import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAP2ZtriOoNH90EIhSZPT6VWyQk4FmQH94",
    authDomain: "iplupiid123.firebaseapp.com",
    projectId: "iplupiid123",
    storageBucket: "iplupiid123.firebasestorage.app",
    messagingSenderId: "44217902916",
    appId: "1:44217902916:web:8376bace85ad45a2af5911",
    measurementId: "G-TVRMERNJR2",
    databaseURL: "https://iplupiid123-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };