import { StyleSheet, Image, View, ScrollView } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";
import { IBook } from "../../types/IBook";
import { useEffect, useState } from "react";
import { fetchBookDetails } from "../../api/APIMethods";

export default function BookModal({
  modalVisible,
  onClose,
  book,
  addedBook,
  onPress
}: {
  modalVisible: boolean;
  onClose: () => void;
  book: IBook;
  addedBook: boolean;
  onPress: () => void;
}) {
  const [description, setDescription] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : undefined;

  async function fetchData() {
    if (modalVisible && book.key) {
      try {
        const { description, genres } = await fetchBookDetails(book.key);
        setDescription(description);
        setGenres(genres);
      } catch (err) {
        setDescription("Failed to load description.");
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [modalVisible, book.key]);

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.container}
        visible={modalVisible}
        onDismiss={onClose}
      >
        <View style={styles.modalContent}>
          {coverUrl && (
            <View style={styles.coverContainer}>
              <Image
                style={styles.bookCover}
                source={{ uri: coverUrl }}
                resizeMode="cover"
              />
              <IconButton
                style={styles.bookmarkIconOverlay}
                icon={"bookmark"}
                size={60}
              />
              <IconButton
                style={styles.iconOverlay}
                icon={addedBook ? "check" : "plus"}
                onPress={onPress}
                size={30}
                iconColor="white"
              />
            </View>
          )}
          <View style={styles.bookInfo}>
            <Text variant="titleMedium">{book.title}</Text>
            <Text>{book.author_name?.join(", ")}</Text>
            <Text>
              {genres.length > 0 ? genres.join(", ") : "No genres available"}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle} variant="titleSmall">
            Description
          </Text>
          <Text>{description}</Text>
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
    width: 380,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 15
  },
  bookCover: {
    width: 100,
    height: 150,
    resizeMode: "contain"
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
    marginBottom: 55
  },
  coverContainer: {
    position: "relative"
  },
  bookmarkIconOverlay: {
    position: "absolute",
    top: -21,
    right: -26.5,
    opacity: 0.8
  },
  iconOverlay: {
    position: "absolute",
    top: -11,
    right: -12
  },
  descriptionContainer: {
    paddingTop: 20
  },
  descriptionTitle: {
    fontWeight: "bold"
  }
});
