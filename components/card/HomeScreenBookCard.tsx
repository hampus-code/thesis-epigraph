import { ScrollView, StyleSheet } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, Text } from "react-native-paper";
import { POPULAR_BOOKS } from "../../constants/popularBooks";

export default function HomeScreenBookCard() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bookList}
    >
      {POPULAR_BOOKS.map((book) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : undefined;

        return (
          <Card key={book.key} style={styles.card}>
            {coverUrl && (
              <Card.Cover source={{ uri: coverUrl }} resizeMode="stretch" />
            )}
            <Card.Content>
              <Text
                variant="titleSmall"
                style={styles.cardText}
                numberOfLines={2}
              >
                {book.title}
              </Text>
              <Text variant="bodySmall" numberOfLines={2}>
                {book.author_name?.join(", ")}
              </Text>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bookList: {
    paddingHorizontal: 10,
    gap: 20,
    flexDirection: "row",
    paddingBottom: 5
  },
  card: {
    width: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden"
  },
  largeTitles: {
    fontWeight: "bold",
    paddingBottom: 10,
    marginLeft: 10
  },
  cardText: {
    marginTop: 5
  }
});
