import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View, Image } from "react-native";
import { RootStackParamList } from "../../navigation/navigation";
import { Button, Text, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import FormButton from "../../components/button/FormButton";
import CustomTextInput from "../../components/input/CustomTextInput";

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
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/epigraph-logo.png")}
      />
      <View style={styles.container}>
        <Text style={styles.titleText}>Register</Text>
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          leftIcon={<TextInput.Icon icon={"account"} />}
          secureOrNot={false}
        />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureOrNot={true}
          leftIcon={<TextInput.Icon icon={"lock"} />}
          rightIcon={<TextInput.Icon icon={"eye-off"} />}
        />
        <CustomTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureOrNot={true}
          leftIcon={<TextInput.Icon icon={"lock"} />}
          rightIcon={<TextInput.Icon icon={"eye-off"} />}
        />
        <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
          Already have an account?
        </Text>
        <FormButton label="Register" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 75
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
  image: {
    width: 150,
    height: 150
  }
});
