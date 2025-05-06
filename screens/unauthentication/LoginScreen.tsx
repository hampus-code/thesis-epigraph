import { useState } from "react";
import { StyleSheet, Alert, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/navigation";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
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
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
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
      />
      <Text style={styles.text} onPress={() => navigation.navigate("Register")}>
        Don't have an account?
      </Text>
      <Button style={styles.button} mode="outlined" onPress={handleLogin}>
        Login
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
    width: 250,
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
