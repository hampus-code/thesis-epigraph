import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Colors from "../../types/Colors";

export default function FormButton({
  label,
  onPress
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View>
      <Button style={styles.button} textColor="black" onPress={onPress}>
        {label}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 150,
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: "center"
  }
});
