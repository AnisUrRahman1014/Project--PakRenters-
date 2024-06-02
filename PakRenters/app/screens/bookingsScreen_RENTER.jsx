import { SafeAreaView, StyleSheet, FlatList, View, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import BookingCustomerCard from "../../components/bookingCustomerCard";
import { ipAddress } from "../../constants/misc";
import axios from "axios";

const BookingDetails = () => {
  const { post } = useLocalSearchParams();
  const [bookings, setBookings] = useState(null);
  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/post/getBookings/${post._id}`
      );
      if (response.status === 200) {
        Alert.alert("Success", "Bookings fetched");
        setBookings(response.data.data);
      } else {
        throw new Error("Hello World");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch bookings. Try again later");
    }
  };
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
          data={bookings}
          renderItem={item =>
            <BookingCustomerCard post={post} booking={item.item} />}
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
