import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Adjust path if needed
import { RootStackParamList } from "../navigation/navigation";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export function useAuth() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const register = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: serverTimestamp()
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Account already exists", errorMessage);
        } else {
          Alert.alert("Registration failed", errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  const login = (email: string, password: string) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-credential") {
          Alert.alert("Wrong credentials", errorMessage);
        } else {
          Alert.alert("Login Failed", errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  return {
    register,
    login,
    loading
  };
}
