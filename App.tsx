import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/navigation";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
