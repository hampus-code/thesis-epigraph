import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  updateProfile,
  reload
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { RootStackParamList } from "../types/navigation.types";

export function useAuth() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

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

        await reload(user);

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: serverTimestamp()
        });

        setUser(auth.currentUser);

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
      .then(async (userCredential) => {
        const user = userCredential.user;

        await reload(user);

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

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Sign Out Failed", errorMessage);
      });
  };

  return {
    register,
    login,
    loading,
    user,
    signOutUser
  };
}
