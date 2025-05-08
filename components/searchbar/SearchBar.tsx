import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchBar({
  value,
  onChangeText,
  placeholder
}: {
  value: string;
  onChangeText: (inputText: string) => void;
  placeholder: string;
}) {
  return (
    <View>
      <Searchbar
        style={styles.searchBar}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 50,
    width: 350
  }
});
