import { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import AuthorModal from "../modal/AuthorModal";

interface Author {
  key: string;
  name: string;
}

export default function AuthorCard({ authorKey }: { authorKey: string }) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAuthor = async () => {
    try {
      const id = authorKey.replace("/authors/", "");
      const response = await fetch(
        `https://openlibrary.org/authors/${id}.json`
      );

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      const data = await response.json();
      setAuthor({ key: id, name: data.name });
    } catch (error) {
      console.error("Error fetching author:", error);
      setAuthor(null); // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [authorKey]);

  if (loading) return <ActivityIndicator />;

  if (!author) return <Text>Author not found</Text>;

  const imageUrl = `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg`;

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.authorImage} />
        <Text style={styles.authorName}>{author.name}</Text>
      </View>
      <AuthorModal
        authorKey={authorKey}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10
  },
  authorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  }
});
