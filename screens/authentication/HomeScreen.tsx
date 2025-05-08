import { View, StyleSheet, Text, FlatList } from "react-native";
import SearchBar from "../../components/searchbar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { searchBook } from "../../api/APIMethods";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export interface BookSearchResponse {
  docs: Book[];
  numFound: number;
  q: string;
  offset: number | null;
}

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
}

export default function HomeScreen() {
  const [inputSearch, setInputSearch] = useState("");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books", inputSearch],
    queryFn: () => searchBook(inputSearch),
    enabled: inputSearch.trim().length > 0
  });

  useEffect(() => {
    if (books && books.length > 0) {
      console.log("First book title:", books[0].title);
    } else {
      console.log("No books returned or books is undefined");
    }
  }, [books, inputSearch]);

  return (
    <View style={styles.container}>
      <SearchBar
        value={inputSearch}
        onChangeText={setInputSearch}
        placeholder="Search books ..."
      />
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
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listContent: {
    alignItems: "center",
    marginTop: 50
  },
  activityIndicator: {
    marginTop: 20
  }
});
