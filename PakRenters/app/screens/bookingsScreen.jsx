import { SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import BookingCustomerCard from "../../components/bookingCustomerCard";

const BookingDetails = () => {
  const { vehicle } = useLocalSearchParams();
  console.log(vehicle);
  const customers = [""];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "Bookings",
          headerTintColor: Color.dark,
          headerTitleAlign: "center"
        }}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={customers}
          renderItem={() => <BookingCustomerCard vehicle={vehicle} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: sizeManager(1)
  }
});
