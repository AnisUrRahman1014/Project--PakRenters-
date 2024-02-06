import { Stack } from "expo-router";
import { Color } from "../constants/GlobalStyles";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf")
  });

  const onLayoutRootView = useCallback(
    async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    },
    [fontsLoaded]
  );
  if (!fontsLoaded) return null;

  return (
    <Stack onLayout={onLayoutRootView}>
      {/* <Stack.Screen name="index" options={{ headerTitle: "Splash Screen", headerShown: true }} /> */}
      <Stack.Screen
        name="screens/login"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerTransparent: true,
          headerTintColor: Color.white
        }}
      />
      <Stack.Screen
        name="screens/signUp"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerTransparent: true,
          headerTintColor: Color.white
        }}
      />
      <Stack.Screen
        name="screens/signUpProfilePic"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerTransparent: true,
          headerTintColor: Color.white
        }}
      />
    </Stack>
  );
};
export default Layout;
