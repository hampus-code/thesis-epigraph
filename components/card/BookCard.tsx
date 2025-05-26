import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, IconButton, Text } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import BookModal from "../modal/BookModal";
import { useBookStore } from "../../store/bookStore";
import { useState } from "react";
import Colors from "../../types/Colors";

export default function BookCard({
  book,
  onDelete,
  onAdd
}: {
  book: IBook;
  onDelete?: () => void;
  onAdd?: () => void;
}) {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { addBook, removeBook } = useBookStore();

  const isBookInList = useBookStore((state) =>
    state.booklist.some((b) => b.key === book.key)
  );

  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

  async function handleBookInBooklist() {
    const isBookMarked = !isBookInList;

    if (isBookMarked && user) {
      try {
        const safeKey = book.key.replace(/\//g, "_");
        const bookRef = doc(db, "users", user.uid, "books", safeKey);
        await setDoc(bookRef, {
          title: book.title,
          author: book.author_name,
          key: book.key,
          cover: book.cover_i,
          description: book.description ?? "No description available.",
          addedAt: serverTimestamp()
        });
        addBook(book);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error adding book: ", error.message);
        }
      }
    } else if (user) {
      try {
        const safeKey = book.key.replace(/\//g, "_");
        const bookRef = doc(db, "users", user.uid, "books", safeKey);
        await deleteDoc(bookRef);
        removeBook(book.key);
        onDelete?.();
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error deleting book: ", error.message);
        }
      }
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ overflow: "hidden" }}>
          <Card.Content style={styles.bookCard}>
            <View style={styles.row}>
              {coverUrl && (
                <View style={styles.coverContainer}>
                  <Image
                    style={styles.bookCover}
                    source={
                      book.cover_i
                        ? { uri: coverUrl }
                        : require("../../assets/cover-placeholder.png")
                    }
                    resizeMode="cover"
                  />
                  <IconButton
                    style={styles.bookmarkIconOverlay}
                    icon={"bookmark"}
                    size={60}
                    iconColor={isBookInList ? "#F4AB3C" : "#000000B3"}
                  />
                  <IconButton
                    style={styles.iconOverlay}
                    icon={isBookInList ? "check" : "plus"}
                    onPress={handleBookInBooklist}
                    size={30}
                    iconColor="white"
                  />
                </View>
              )}
              <View style={styles.bookInfo}>
                <Text variant="titleMedium">{book.title}</Text>
                <Text style={{ marginTop: 5 }}>
                  {book.author_name?.join(", ")}
                </Text>
              </View>
            </View>
          </Card.Content>
        </View>
      </TouchableOpacity>

      <BookModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        book={book}
        addedBook={isBookInList}
        onPress={handleBookInBooklist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    width: 350,
    backgroundColor: Colors.secondary,
    elevation: 5
  },
  bookCover: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  bookInfo: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 10
  },
  coverContainer: {
    position: "relative"
  },
  bookmarkIconOverlay: {
    position: "absolute",
    top: -22,
    right: -26.5
  },
  iconOverlay: {
    position: "absolute",
    top: -12,
    right: -12
  }
});
