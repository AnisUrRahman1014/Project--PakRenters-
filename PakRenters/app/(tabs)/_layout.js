import { React } from "react";
import { Tabs } from "expo-router";
import { Color } from "../../constants/GlobalStyles";
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
        name="notificationScreen"
        options={{
          headerShown: true,
          headerTintColor: Color.dark,
          title: "Notifications",
          tabBarIcon: ({ color }) =>
            <FontAwesome name={"bell"} color={color} size={25} />
        }}
      />
      <Tabs.Screen
        name="inboxScreen"
        options={{
          headerShown: false,
          title: "Messages",
          tabBarIcon: ({ color }) =>
            <FontAwesome name="inbox" color={color} size={30} />
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) =>
            <FontAwesome name="user" color={color} size={25} />
        }}
      />
    </Tabs>
  );
}
