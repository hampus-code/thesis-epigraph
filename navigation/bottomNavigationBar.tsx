import React from "react";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "../screens/authentication/Home/HomeScreen";
import BookListScreen from "../screens/authentication/Booklist/BookListScreen";
import SearchScreen from "../screens/authentication/Search/SearchScreen";
import AccountScreen from "../screens/authentication/Account/AccountScreen";

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
      key: "account",
      title: "Account",
      focusedIcon: "account-circle",
      unfocusedIcon: "account-circle-outline"
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    bookList: BookListScreen,
    search: SearchScreen,
    account: AccountScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
