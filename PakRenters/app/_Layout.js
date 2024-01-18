import { Stack } from "expo-router";
import { Color, FontFamily } from "../constants/GlobalStyles";
import { useFonts } from "expo-font";

const Layout = () => {
  return (
    <Stack>
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
