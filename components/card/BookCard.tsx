import { View, StyleSheet, Image } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, Text } from "react-native-paper";

export default function BookCard({ book }: { book: IBook }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : undefined;

  return (
    <View>
      <Card.Content style={styles.bookCard}>
        <View style={styles.row}>
          {coverUrl && (
            <Image style={styles.bookCover} source={{ uri: coverUrl }} />
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
  }
});
