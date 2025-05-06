import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../navigation/navigation";
import { Button, Text, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSecure = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
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
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Register</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        mode="outlined"
        theme={{ roundness: 20 }}
        left={<TextInput.Icon icon={"account"} />}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        mode="outlined"
        theme={{ roundness: 20 }}
        left={<TextInput.Icon icon={"lock"} />}
        right={<TextInput.Icon icon={"eye-off"} />}
      />
      <TextInput
        style={styles.textInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
        mode="outlined"
        theme={{ roundness: 20 }}
        left={<TextInput.Icon icon={"lock"} />}
        right={<TextInput.Icon icon={"eye-off"} />}
      />
      <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Already have an account?
      </Text>
      <Button style={styles.button} mode="outlined" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 30
  },
  textInput: {
    width: 300,
    borderRadius: 20,
    marginTop: 10
  },
  text: {
    textDecorationLine: "underline",
    marginTop: 10
  },
  button: {
    marginTop: 10
  }
});
