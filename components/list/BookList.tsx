import { View, StyleSheet, Text, FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchBook } from "../../api/APIMethods";
import { ActivityIndicator } from "react-native-paper";
import BookCard from "../../components/card/BookCard";

export default function BookList({ query }: { query: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["books", query],
      queryFn: ({ pageParam = 1 }) => searchBook(query, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 100 ? allPages.length + 1 : undefined;
      },
      enabled: query.trim().length > 0
    });

  const books = data?.pages.flat() ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          size={"large"}
        />
      ) : books.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <BookCard book={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
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
