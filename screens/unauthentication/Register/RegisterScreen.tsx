import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import FormButton from "../../../components/button/FormButton";
import CustomTextInput from "../../../components/input/CustomTextInput";
import { useAuth } from "../../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../types/navigation.types";
import Colors from "../../../types/Colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardWrapper}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/epigraph-logo.png")}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <CustomTextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                leftIcon={<TextInput.Icon icon={"email"} />}
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
                onPress={() => register(email, password, confirmPassword)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background
  },
  keyboardWrapper: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 150
  },
  container: {
    alignItems: "center",
    marginTop: 20
  },
  titleText: {
    fontSize: 30
  },
  text: {
    textDecorationLine: "underline",
    marginTop: 10
  },
  logo: {
    width: 150,
    height: 150
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50
  }
});
