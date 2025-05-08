import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/navigation";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
