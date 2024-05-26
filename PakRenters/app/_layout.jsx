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
      <Stack.Screen
        name="screens/(bookingScreens)/bookingScreen"
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerTintColor: Color.white,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="screens/(bookingScreens)/bookingReport"
        options={{
          headerShown: true,
          title: "Booking Report",
          headerShadowVisible: true,
          headerTintColor: Color.white,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Color.dark }
        }}
      />
      <Stack.Screen
        name="screens/userPovProfile"
        options={{
          headerShown: true,
          title: "User Profile",
          headerShadowVisible: true,
          headerTintColor: Color.dark,
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen
        name="screens/postsViewUserPov"
        options={{
          headerShown: true,
          title: "Posts",
          headerShadowVisible: true,
          headerTintColor: Color.dark,
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen
        name="screens/bundleRequestForm"
        options={{
          headerShown: true,
          title: "Request a custom bundle",
          headerShadowVisible: true,
          headerTintColor: Color.dark,
          headerTitleAlign: "center"
        }}
      />
    </Stack>
  );
};
export default Layout;
