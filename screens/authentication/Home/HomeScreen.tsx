import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView
} from "react-native";
import SearchBar from "../../../components/searchbar/SearchBar";
import { useState } from "react";
import BookList from "../../../components/list/BookList";
import { IBook } from "../../../types/IBook";
import HomeScreenBookCard from "../../../components/card/HomeScreenBookCard";
import AuthorCard from "../../../components/card/AuthorCard";
import { Text } from "react-native-paper";

export default function HomeScreen() {
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
    <SafeAreaView style={styles.container}>
      <View>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.authorList}>
              {popularAuthors.map((authorKey) => (
                <AuthorCard key={authorKey} authorKey={authorKey} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  bookList: {
    marginBottom: 20
  },
  authorList: {
    flexDirection: "row",
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
