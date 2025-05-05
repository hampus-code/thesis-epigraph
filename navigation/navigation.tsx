import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import LoginScreen from "../screens/unauthentication/LoginScreen";
import HomeScreen from "../screens/authentication/HomeScreen";
import BottomNavigationBar from "./bottomNavigationBar";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
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
        name="Home"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
