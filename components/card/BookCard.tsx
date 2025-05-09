import { View, StyleSheet, Image } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, IconButton, Text } from "react-native-paper";
import { useState } from "react";

export default function BookCard({ book }: { book: IBook }) {
  const [addedBook, setAddedBook] = useState(false);
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : undefined;

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
                onPress={() => setAddedBook(!addedBook)}
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
