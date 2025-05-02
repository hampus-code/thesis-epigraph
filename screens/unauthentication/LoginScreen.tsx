import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [userInput, setUserInput] = useState("");

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setUserInput}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setUserInput}
        placeholder="Password"
      />
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
  textInput: {
    borderWidth: 1,
    width: 250,
    borderRadius: 10,
    marginTop: 10
  }
});
