import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  secureOrNot,
  rightIcon,
  leftIcon
}: {
  value: string;
  onChangeText: (inputText: string) => void;
  placeholder: string;
  secureOrNot: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}) {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        mode="outlined"
        theme={{ roundness: 20 }}
        secureTextEntry={secureOrNot}
        right={rightIcon}
        left={leftIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    borderRadius: 20,
    marginTop: 10
  }
});
