import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="postAdScreen1"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default Layout;
