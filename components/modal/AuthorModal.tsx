import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

interface AuthorWork {
  key: string;
  title: string;
}

export default function AuthorModal({
  authorKey,
  modalVisible,
  onClose
}: {
  authorKey: string;
  modalVisible: boolean;
  onClose: () => void;
}) {
  const [works, setWorks] = useState<AuthorWork[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorWorks = async (retries = 3) => {
    try {
      const id = authorKey.replace("/authors/", "");
      const response = await fetch(
        `https://openlibrary.org/authors/${id}/works.json?limit=10`
      );

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      const data = await response.json();
      setWorks(data.entries || []);
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying fetch... ${retries} attempts left.`);
        setTimeout(() => fetchAuthorWorks(retries - 1), 2000);
      } else {
        console.error("Error fetching works:", error);
        setWorks([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) fetchAuthorWorks();
  }, [modalVisible, authorKey]);

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.container}
      >
        <View style={styles.modalContent}>
          <View style={styles.bookInfo}>
            <Text variant="titleMedium">Works by Author</Text>
            <Text>{works.length} works found</Text>
          </View>
        </View>

        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle} variant="titleSmall">
            List of Works
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : works.length ? (
            works.map((work) => (
              <View key={work.key} style={styles.workItem}>
                <Text>{work.title}</Text>
              </View>
            ))
          ) : (
            <Text>
              Unable to load works at the moment. Please try again later.
            </Text>
          )}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: 400,
    width: "92%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 15
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  bookInfo: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginBottom: 10
  },
  descriptionContainer: {
    paddingTop: 20,
    width: "100%"
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 10
  },
  workItem: {
    marginBottom: 5
  }
});
