import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyARV_gr26Q1M80C5b6U9B75k_AWP8xrN4o",
  authDomain: "epigraph-43dbf.firebaseapp.com",
  projectId: "epigraph-43dbf",
  storageBucket: "epigraph-43dbf.firebasestorage.app",
  messagingSenderId: "770742907237",
  appId: "1:770742907237:web:166d74108f2609028d318c"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
