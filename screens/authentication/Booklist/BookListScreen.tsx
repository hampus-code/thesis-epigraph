import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { IBook } from "../../../types/IBook";
import { useAuth } from "../../../hooks/useAuth";
import BookCard from "../../../components/card/BookCard";
import { fetchBooklist } from "../../../firebase/bookList";

export default function BookListScreen() {
  const [booklist, setBooklist] = useState<IBook[]>([]);
  const { user } = useAuth();

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
            onDelete={() =>
              setBooklist((prev) =>
                prev.filter((book) => book.key !== item.key)
              )
            }
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
