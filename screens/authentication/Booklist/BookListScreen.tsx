import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { IBook } from "../../../types/IBook";
import { useAuth } from "../../../hooks/useAuth";
import BookCard from "../../../components/card/BookCard";

export default function BookListScreen() {
  const [booklist, setBooklist] = useState<IBook[]>([]);
  const { user } = useAuth();

  async function fetchBooklist() {
    try {
      if (!user?.uid) return;
      const booksRef = collection(db, "users", user.uid, "books");
      const querySnap = await getDocs(booksRef);
      const books: IBook[] = [];

      querySnap.forEach((doc) => {
        const data = doc.data();
        books.push({
          title: data.title,
          author_name: data.author,
          key: data.key,
          cover_i: data.cover || undefined
        });
      });

      setBooklist(books);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error fetching books: ", error.message);
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchBooklist();
    }
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
