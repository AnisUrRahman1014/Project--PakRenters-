import {Stack} from 'expo-router';
import { Color, FontFamily } from '../constants/GlobalStyles';
import { useFonts } from 'expo-font';

const Layout = ()=> {
    const [fontsLoaded, error] = useFonts({
      "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
      "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf")
    });

    if (!fontsLoaded && !error) {
      return null;
    }
    return (
    <Stack>
        <Stack.Screen name="index"  options={{
            headerTitle: "Splash Screen",
            headerShown: false,
        }}/>
        <Stack.Screen name="screens/login" options={{
            headerTitle: "",
            headerBackVisible: true,
            headerTransparent: true,
            headerTintColor: Color.colorWhite,
            headerTitleAlign: "center",
        }}/>
    </Stack>
    )
}
export default Layout;
