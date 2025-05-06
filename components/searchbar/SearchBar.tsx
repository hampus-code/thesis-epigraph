import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search books ..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  searchBar: {
    marginTop: 50,
    width: 350
  }
});
