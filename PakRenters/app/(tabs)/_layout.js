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
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) =>
            <FontAwesome name={"home"} color={color} size={30} />
        }}
      />
      <Tabs.Screen
        name="loginV2"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) =>
            <FontAwesome name={"user"} color={color} size={30} />
        }}
      />
    </Tabs>
  );
}
