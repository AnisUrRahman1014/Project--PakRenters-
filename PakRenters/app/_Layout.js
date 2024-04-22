import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Color } from "../constants/GlobalStyles";
SplashScreen.preventAutoHideAsync();
const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "BreeSerif-Regular": require("../assets/fonts/BreeSerif-Regular.ttf")
  });

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/(postAdScreens)"
        options={{
          headerShown: false,
          title: "Create a post",
          headerShadowVisible: false,
          headerTintColor: Color.dark
        }}
      />
    </Stack>
  );
};
export default Layout;
