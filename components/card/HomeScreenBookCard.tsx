import { ScrollView, View, StyleSheet } from "react-native";
import { IBook } from "../../types/IBook";
import { Card, Text } from "react-native-paper";

export default function HomeScreenBookCard() {
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
      cover_i: 12606502,
      description: "A novel about racial injustice in the Deep South."
    },
    {
      key: "/works/OL27448W",
      title: "The Lord of the Rings",
      author_name: ["J.R.R. Tolkien"],
      cover_i: 14626824,
      description:
        "A richly complex series that ushered in a new age of epic adventure storytelling. It tells the great quest undertaken by Frodo and the Fellowship of the Ring to destroy the One Ring and defeat Sauron."
    },
    {
      key: "/works/OL82563W",
      title: "Harry Potter and the Philosopher's Stone",
      author_name: ["J.K. Rowling"],
      cover_i: 10521270,
      description:
        "The first book in the Harry Potter series, introducing the young wizard Harry Potter as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry."
    }
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bookList}
    >
      {popularBooks.map((book) => {
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
    flexDirection: "row"
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
