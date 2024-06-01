import React from "react";
import { Stack } from "expo-router";
import { Color } from "../../../constants/GlobalStyles";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="postDetailScreen"
        options={{
          headerShown: true,
          title: "Create a post",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="vehicleDetailsScreen"
        options={{
          headerShown: true,
          title: "Enter vehicle details",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="servicesDetailScreen"
        options={{
          headerShown: true,
          title: "Choose applicable services",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />

      <Stack.Screen
        name="featurePostScreen"
        options={{
          headerShown: true,
          title: "Post Featuring",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
};

export default Layout;
