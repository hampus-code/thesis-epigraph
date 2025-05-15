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
import AccountScreen from "../screens/authentication/Account/AccountScreen";
import { RootStackParamList } from "../types/navigation.types";

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
    </Stack.Navigator>
  );
}
