import { useState } from "react";
import { useAudioRecorder, RecordingPresets } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { LEMONFOX_API_KEY } from "@env";
import { Alert } from "react-native";

export async function useAudioSearch(
  uri: string,
  onTranscription: (text: string) => void
) {
  try {
    const fileUri = uri.startsWith("file://") ? uri : `file://${uri}`;
    const filename = uri.split("/").pop() || "recording.m4a";
    const fileType = "audio/m4a";

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      Alert.alert("Audio file does not exist at:", fileUri);
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: filename,
      type: fileType
    } as any);

    formData.append("language", "english");
    formData.append("response_format", "json");

    const response = await fetch(
      "https://api.lemonfox.ai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LEMONFOX_API_KEY}`
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      Alert.alert("Transcription failed:", errorText);
      return;
    }

    const data = await response.json();
    const cleanedText = data.text.trim().replace(/[.,!?]+$/, "");
    onTranscription(cleanedText);
  } catch (error: any) {
    if (error instanceof Error) {
      Alert.alert(
        "Error transcribing audio with Lemonfox.ai API:",
        error.message
      );
    }
  }
}

export function useAudioRecorderAndTranscribe(
  onTranscription: (text: string) => void
) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);

  async function handleMicPress() {
    try {
      if (isRecording) {
        await recorder.stop();
        setIsRecording(false);

        const uri = recorder.uri;
        if (uri) {
          await new Promise((res) => setTimeout(res, 1000));

          await useAudioSearch(uri, onTranscription);
        }
      } else {
        await recorder.prepareToRecordAsync();
        recorder.record();
        setIsRecording(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Recording error: ", error.message);
      }
    }
  }

  return { isRecording, handleMicPress };
}
