import React from "react";
import { Stack } from "expo-router";
import { Color } from "../../../constants/GlobalStyles";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="postAdScreen1"
        options={{
          headerShown: true,
          title: "Create a post",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="postAdScreen2"
        options={{
          headerShown: true,
          title: "Create a post",
          headerTintColor: Color.dark,
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
};

export default Layout;
