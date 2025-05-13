import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { Button, Icon, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/navigation";
import { Surface } from "react-native-paper";

export default function AccountScreen() {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { signOutUser } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.surfaceContainer}>
        <Surface style={styles.profileRow} elevation={2}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../../assets/default-account-avatar.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.emailText}>{user?.email}</Text>
        </Surface>
      </View>
      <Surface style={styles.accountColumn} elevation={1}>
        <View style={styles.columns}>
          <Icon source={"bookshelf"} size={35} />
          <TouchableOpacity onPress={() => navigation.navigate("BookList")}>
            <Text>My Booklist</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columns}>
          <Icon source={"account-circle"} size={35} />

          <Text>Edit Profile</Text>
        </View>
        <View style={styles.columns}>
          <Icon source={"cog"} size={35} />

          <Text>Settings</Text>
        </View>
      </Surface>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.signOutButton}
          mode="outlined"
          onPress={() => signOutUser()}
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 50,
    marginLeft: 20,
    justifyContent: "center"
  },
  emailText: {
    fontSize: 16,
    marginLeft: 20
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20,
    margin: 10
  },
  accountColumn: {
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
    flex: 1
  },
  columns: {
    alignItems: "center",
    margin: 10,
    height: 50,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row"
  },
  buttonContainer: {
    alignItems: "center"
  },
  signOutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    width: 150
  },
  surfaceContainer: {
    overflow: "hidden"
  }
});
