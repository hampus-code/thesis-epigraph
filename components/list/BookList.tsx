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
    <View style={styles.wrapper}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          size={"large"}
        />
      ) : books && books.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <BookCard book={item} />}
        />
      ) : query.trim().length > 0 ? (
        <Text style={styles.noResultsText}>No results found for "{query}"</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50
  },
  listContent: {
    alignItems: "center"
  },
  activityIndicator: {
    marginTop: 20
  },
  noResultsText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
    color: "#666"
  }
});
