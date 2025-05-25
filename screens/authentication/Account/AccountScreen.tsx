import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { Button, Icon, Text } from "react-native-paper";
import { Surface } from "react-native-paper";
import { useTabStore } from "../../../store/tabStore";
import Colors from "../../../types/Colors";

export default function AccountScreen() {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { setSelectedTab } = useTabStore();

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
        <Surface style={styles.profileRow} elevation={1}>
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
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.profileText}>{user?.email}</Text>
            <Text style={styles.profileText}>
              Joined{" "}
              {user?.metadata.creationTime
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }).format(new Date(user.metadata.creationTime))
                : ""}
            </Text>
          </View>
        </Surface>
      </View>
      <Surface style={styles.accountColumn} elevation={1}>
        <View style={styles.columns}>
          <Icon source={"bookshelf"} size={30} />
          <View style={{ flex: 1, alignItems: "center", marginRight: 30 }}>
            <TouchableOpacity onPress={() => setSelectedTab("bookList")}>
              <Text>My Booklist</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.columns}>
          <Icon source={"account-circle"} size={30} />
          <View style={{ flex: 1, alignItems: "center", marginRight: 30 }}>
            <Text>Edit Profile</Text>
          </View>
        </View>

        <View style={styles.columns}>
          <Icon source={"cog"} size={30} />
          <View style={{ flex: 1, alignItems: "center", marginRight: 30 }}>
            <Text>Settings</Text>
          </View>
        </View>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button style={styles.signOutButton} onPress={() => signOutUser()}>
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 25,
    marginTop: 30,
    marginLeft: 20
  },
  profileText: {
    fontSize: 16,
    marginLeft: 15
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20,
    margin: 30
  },
  accountColumn: {
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 30,
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
    borderRadius: 10,
    margin: 10,
    width: 150,
    backgroundColor: Colors.primary
  },
  surfaceContainer: {
    overflow: "hidden"
  }
});
