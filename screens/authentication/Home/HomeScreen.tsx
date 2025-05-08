import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SearchBar from "../../../components/searchbar/SearchBar";
import { useState } from "react";
import BookList from "../../../components/list/BookList";

export default function HomeScreen() {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SearchBar
          value={inputSearch}
          onChangeText={setInputSearch}
          placeholder="Search books ..."
        />
        <BookList query={inputSearch} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
