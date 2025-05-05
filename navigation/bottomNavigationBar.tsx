import React from "react";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "../screens/authentication/HomeScreen";

export default function BottomNavigationBar() {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline"
    },
    {
      key: "bookList",
      title: "Book List",
      focusedIcon: "bookshelf"
    },
    {
      key: "search",
      title: "Search",
      focusedIcon: "magnify"
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline"
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    bookList: HomeScreen,
    search: HomeScreen,
    settings: HomeScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
