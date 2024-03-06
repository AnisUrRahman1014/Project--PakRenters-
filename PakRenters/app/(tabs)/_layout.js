import { React } from "react";
import { Tabs } from "expo-router";
import { Color } from "../../constants/GlobalStyles";
import { Icon } from "react-native-vector-icons/FontAwesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Color.dark }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () =>
            <FontAwesome name={"home"} color={Color.dark} size={30} />
        }}
      />
      <Tabs.Screen
        name="loginV2"
        options={{
          title: "Profile",
          tabBarIcon: () =>
            <FontAwesome name={"user"} color={Color.dark} size={30} />
        }}
      />
    </Tabs>
  );
}
