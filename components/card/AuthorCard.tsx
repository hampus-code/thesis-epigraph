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
import { useQuery } from "@tanstack/react-query";
import { fetchAuthor } from "../../api/APIMethods";

export default function AuthorCard({ authorKey }: { authorKey: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: author,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["author", authorKey],
    queryFn: () => fetchAuthor(authorKey),
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  if (isLoading) return <ActivityIndicator />;
  if (isError || !author) return <Text>Author not found</Text>;

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
