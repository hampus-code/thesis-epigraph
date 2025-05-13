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

export default function HomeScreen() {
  const [inputSearch, setInputSearch] = useState("");

  const popularAuthors = [
    "/authors/OL23919A",
    "/authors/OL26320A",
    "/authors/OL2622837A",
    "/authors/OL24638A"
  ];

  const popularBooks: IBook[] = [
    {
      key: "/works/OL45883W",
      title: "The Great Gatsby",
      author_name: ["F. Scott Fitzgerald"],
      cover_i: 123456,
      description: "A novel about the American dream."
    },
    {
      key: "/works/OL12345W",
      title: "1984",
      author_name: ["George Orwell"],
      cover_i: 234567,
      description: "A dystopian novel set in a totalitarian society."
    },
    {
      key: "/works/OL67890W",
      title: "To Kill a Mockingbird",
      author_name: ["Harper Lee"],
      cover_i: 345678,
      description: "A novel about racial injustice in the Deep South."
    }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.keyboardWrapper} behavior="height">
        <View style={styles.container}>
          <View>
            <Text>Welcome, user</Text>
          </View>
          <View>
            <Text variant="titleLarge" style={styles.largeTitles}>
              Popular Books
            </Text>
            <View style={styles.bookList}>
              <HomeScreenBookCard />
            </View>
          </View>
          <View>
            <Text variant="titleLarge" style={styles.largeTitles}>
              Popular Authors
            </Text>
          </View>
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
    paddingTop: 100
  },
  bookList: {
    marginBottom: 20
  },
  authorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  largeTitles: {
    fontWeight: "bold",
    paddingBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 15
  }
});
