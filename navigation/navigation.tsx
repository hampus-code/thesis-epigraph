import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import LoginScreen from "../screens/unauthentication/Login/LoginScreen";
import BottomNavigationBar from "./bottomNavigationBar";
import RegisterScreen from "../screens/unauthentication/Register/RegisterScreen";
import BookListScreen from "../screens/authentication/Booklist/BookListScreen";
import SearchScreen from "../screens/authentication/Search/SearchScreen";
import SettingsScreen from "../screens/authentication/Settings/SettingsScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  BookList: undefined;
  Search: undefined;
  Settings: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookList"
        component={BookListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
