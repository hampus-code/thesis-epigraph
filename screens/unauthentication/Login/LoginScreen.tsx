import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/navigation";
import { Text, TextInput } from "react-native-paper";
import FormButton from "../../../components/button/FormButton";
import CustomTextInput from "../../../components/input/CustomTextInput";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={require("../../../assets/epigraph-logo.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyboardWrapper} behavior="height">
          <View style={styles.container}>
            <Text style={styles.titleText}>Login</Text>
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
              leftIcon={<TextInput.Icon icon={"lock"} />}
              rightIcon={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureOrNot={!showPassword}
            />
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Register")}
            >
              Don't have an account?
            </Text>
            <FormButton label="Login" onPress={() => login(email, password)} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
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
    width: 250,
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
