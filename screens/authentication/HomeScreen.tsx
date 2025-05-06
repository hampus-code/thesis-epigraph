import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/searchbar/SearchBar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
