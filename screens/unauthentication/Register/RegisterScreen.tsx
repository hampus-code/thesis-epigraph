import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { RootStackParamList } from "../../../navigation/navigation";
import { Text, TextInput } from "react-native-paper";
import FormButton from "../../../components/button/FormButton";
import CustomTextInput from "../../../components/input/CustomTextInput";
import { useAuth } from "../../../hooks/useAuth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.keyboardWrapper} behavior="height">
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require("../../../assets/epigraph-logo.png")}
          />
          <View style={styles.container}>
            <Text style={styles.titleText}>Register</Text>
            <CustomTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              leftIcon={<TextInput.Icon icon={"email"} />}
              secureOrNot={false}
            />
            <CustomTextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              leftIcon={<TextInput.Icon icon={"account"} />}
              secureOrNot={false}
            />
            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureOrNot={!showPassword}
              leftIcon={<TextInput.Icon icon={"lock"} />}
              rightIcon={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <CustomTextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureOrNot={!showConfirmPassword}
              leftIcon={<TextInput.Icon icon={"lock"} />}
              rightIcon={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye" : "eye-off"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account?
            </Text>
            <FormButton
              label="Register"
              onPress={() =>
                register(email, password, confirmPassword, username)
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1
  },
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
