import { View, StyleSheet, Text, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { searchBook } from "../../api/APIMethods";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import BookCard from "../../components/card/BookCard";

export default function BookList({ query }: { query: string }) {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBook(query),
    enabled: query.trim().length > 0
  });

  useEffect(() => {
    if (books && books.length > 0) {
      console.log("First book title:", books[0].title);
    } else {
      console.log("No books returned or books is undefined");
    }
  }, [books, query]);
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          size={"large"}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <BookCard book={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    alignItems: "center",
    marginTop: 50
  },
  activityIndicator: {
    marginTop: 20
  }
});
