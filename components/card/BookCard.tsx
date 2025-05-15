import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, IconButton, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import BookModal from "../modal/BookModal";

export default function BookCard({
  book,
  onDelete
}: {
  book: IBook;
  onDelete?: () => void;
}) {
  const [addedBook, setAddedBook] = useState(false);
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

  async function handleBookInBooklist() {
    const isBookMarked = !addedBook;
    setAddedBook(isBookMarked);

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
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error adding book: ", error.message);
          console.log("Error adding book: ", error.message);
        }
      }
    }
    if (!isBookMarked && user) {
      try {
        const safeKey = book.key.replace(/\//g, "_");
        const bookRef = doc(db, "users", user.uid, "books", safeKey);
        await deleteDoc(bookRef);
        onDelete?.();
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error deleting book: ", error.message);
        }
      }
    }
  }

  async function checkIfBookIsAdded() {
    if (user) {
      const safeKey = book.key.replace(/\//g, "_");
      const bookRef = doc(db, "users", user.uid, "books", safeKey);
      const docSnap = await getDoc(bookRef);

      if (docSnap.exists()) {
        setAddedBook(true);
      }
    }
  }

  useEffect(() => {
    checkIfBookIsAdded();
  }, [user, book.key]);

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
                    iconColor={addedBook ? "#F4AB3C" : "#000000B3"}
                  />
                  <IconButton
                    style={styles.iconOverlay}
                    icon={addedBook ? "check" : "plus"}
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
        addedBook={addedBook}
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
    backgroundColor: "#F8CA87",
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
