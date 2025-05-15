import React from "react";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "../screens/authentication/Home/HomeScreen";
import BookListScreen from "../screens/authentication/Booklist/BookListScreen";
import SearchScreen from "../screens/authentication/Search/SearchScreen";
import AccountScreen from "../screens/authentication/Account/AccountScreen";
import { useTabStore } from "../store/tabStore";

type TabKey = "home" | "bookList" | "search" | "account";

export default function BottomNavigationBar() {
  const { selectedTab, setSelectedTab } = useTabStore();

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

  const routeKeys = routes.map((r) => r.key);

  const currentIndex = routeKeys.indexOf(selectedTab);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    bookList: BookListScreen,
    search: SearchScreen,
    account: AccountScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index: currentIndex, routes }}
      onIndexChange={(i) => setSelectedTab(routeKeys[i] as typeof selectedTab)}
      renderScene={renderScene}
    />
  );
}
