import { View, StyleSheet, Image, Alert } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, IconButton, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function BookCard({ book }: { book: IBook }) {
  const [addedBook, setAddedBook] = useState(false);
  const { user } = useAuth();
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : undefined;

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
          addedAt: serverTimestamp()
        });
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error adding book: ", error.message);
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
      <Card.Content style={styles.bookCard}>
        <View style={styles.row}>
          {coverUrl && (
            <View style={styles.coverContainer}>
              <Image
                style={styles.bookCover}
                source={{ uri: coverUrl }}
                resizeMode="cover"
              />
              <IconButton
                style={styles.bookmarkIconOverlay}
                icon={"bookmark"}
                size={60}
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
            <Text style={{ marginTop: 5 }}>{book.author_name?.join(", ")}</Text>
          </View>
        </View>
      </Card.Content>
    </View>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    marginBottom: 10,
    width: 350
  },
  bookCover: {
    width: 100,
    height: 150,
    resizeMode: "contain"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  bookInfo: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20
  },
  coverContainer: {
    position: "relative"
  },
  bookmarkIconOverlay: {
    position: "absolute",
    top: -21,
    right: -26.5,
    opacity: 0.8
  },
  iconOverlay: {
    position: "absolute",
    top: -11,
    right: -12
  }
});
