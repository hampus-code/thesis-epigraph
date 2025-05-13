import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import SearchBar from "../../../components/searchbar/SearchBar";
import { useState } from "react";
import BookList from "../../../components/list/BookList";
import { IBook } from "../../../types/IBook";
import HomeScreenBookCard from "../../../components/card/HomeScreenBookCard";
import AuthorCard from "../../../components/card/AuthorCard";
import { Text } from "react-native-paper";

export default function SearchScreen() {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.keyboardWrapper} behavior="height">
        <View style={styles.container}>
          <SearchBar
            value={inputSearch}
            onChangeText={setInputSearch}
            placeholder="Search books ..."
          />
          <BookList query={inputSearch} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 105
  }
});
