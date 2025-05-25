import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HomeScreenBookCard from "../../../components/card/HomeScreenBookCard";
import AuthorCard from "../../../components/card/AuthorCard";
import { Text } from "react-native-paper";
import { useAuth } from "../../../hooks/useAuth";
import { POPULAR_AUTHORS } from "../../../constants/popularAuthors";
import Colors from "../../../types/Colors";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.userText}>
          <Text>
            <Text variant="headlineMedium">Welcome, </Text>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
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
              {POPULAR_AUTHORS.map((authorKey) => (
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
    paddingTop: 80,
    backgroundColor: Colors.background
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
