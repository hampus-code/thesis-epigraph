import { View, StyleSheet } from "react-native";
import { Book } from "../../screens/authentication/HomeScreen";
import { Card, Text } from "react-native-paper";

export default function BookCard({ book }: { book: Book }) {
  return (
    <View>
      <Card.Content style={styles.bookCard}>
        <Text variant="titleMedium">{book.title}</Text>
        <Text>{book.author_name}</Text>
      </Card.Content>
    </View>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 40,
    marginBottom: 10,
    width: 350
  }
});
