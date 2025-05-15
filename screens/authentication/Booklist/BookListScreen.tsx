import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { IBook } from "../../../types/IBook";
import { useAuth } from "../../../hooks/useAuth";
import BookCard from "../../../components/card/BookCard";
import { fetchBooklist } from "../../../firebase/bookList";
import { useBookStore } from "../../../store/bookStore";

export default function BookListScreen() {
  const { user } = useAuth();
  const { booklist, setBooklist, removeBook, addBook } = useBookStore();

  async function loadBooks() {
    try {
      if (!user?.uid) return;
      const books = await fetchBooklist(user.uid);
      setBooklist(books);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error fetching books: ", error.message);
      }
    }
  }

  useEffect(() => {
    loadBooks();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.headerText}>
        My Booklist
      </Text>
      <FlatList
        data={booklist}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onDelete={() => removeBook(item.key)}
            onAdd={() => addBook(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  headerText: {
    marginTop: 100,
    marginBottom: 50
  }
});
