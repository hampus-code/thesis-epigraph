import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../navigation/navigation";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        mode="outlined"
        theme={{ roundness: 20 }}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
        mode="outlined"
        theme={{ roundness: 20 }}
      />
      <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Already have an account?
      </Text>
      <Button style={styles.button} mode="outlined">
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
