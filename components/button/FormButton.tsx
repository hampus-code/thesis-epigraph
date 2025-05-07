import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function FormButton({
  label,
  onPress
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View>
      <Button style={styles.button} mode="outlined" onPress={onPress}>
        {label}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  }
});
