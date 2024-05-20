import { Stack } from "expo-router/";
import React from "react";
import { Color } from "../../../constants/GlobalStyles";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="profileDashboard" options={{ headerShown: false }} />
      <Stack.Screen
        name="managePersonalInfo"
        options={{
          headerShown: true,
          headerTitle: "Personal Information",
          headerShadowVisible: false,
          headerTintColor: Color.dark
        }}
      />
      <Stack.Screen
        name="manageAds"
        options={{
          headerShown: true,
          headerTitle: "Manage Posts",
          headerShadowVisible: false,
          headerTintColor: Color.dark
        }}
      />
      <Stack.Screen
        name="manageBookings"
        options={{
          headerShown: true,
          headerTitle: "Manage Bookings",
          headerShadowVisible: false,
          headerTintColor: Color.dark
        }}
      />
      <Stack.Screen
        name="manageVehicleStatus"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
