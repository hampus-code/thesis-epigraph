import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HomeScreenBookCard from "../../../components/card/HomeScreenBookCard";
import AuthorCard from "../../../components/card/AuthorCard";
import { Text } from "react-native-paper";
import { useAuth } from "../../../hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  const popularAuthors = [
    "/authors/OL23919A",
    "/authors/OL26320A",
    "/authors/OL2622837A",
    "/authors/OL24638A"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.userText}>
          <Text>
            <Text variant="headlineLarge">Welcome, </Text>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              {user?.displayName || user?.email}!
            </Text>
          </Text>
        </View>
        <View>
          <Text variant="titleLarge" style={styles.largeTitles}>
            Popular Books
          </Text>
          <View style={styles.bookList}>
            <HomeScreenBookCard />
          </View>
        </View>
        <View>
          <Text variant="titleLarge" style={styles.largeTitles}>
            Popular Authors
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.authorList}>
              {popularAuthors.map((authorKey) => (
                <AuthorCard key={authorKey} authorKey={authorKey} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80
  },
  bookList: {
    marginBottom: 20
  },
  authorList: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  largeTitles: {
    fontWeight: "bold",
    paddingBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 15
  },
  userText: {
    marginLeft: 10,
    marginBottom: 10
  }
});
