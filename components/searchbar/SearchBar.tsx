import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useAudioRecorderAndTranscribe } from "../../hooks/useAudioSearch";

export default function SearchBar({
  value,
  onChangeText,
  placeholder
}: {
  value: string;
  onChangeText: (inputText: string) => void;
  placeholder: string;
}) {
  const { isRecording, handleMicPress } =
    useAudioRecorderAndTranscribe(onChangeText);
  return (
    <View>
      <Searchbar
        style={styles.searchBar}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        traileringIcon={isRecording ? "stop-circle" : "microphone"}
        onTraileringIconPress={handleMicPress}
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
