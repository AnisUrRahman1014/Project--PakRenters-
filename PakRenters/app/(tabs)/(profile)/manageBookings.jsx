import { View, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Color, sizeManager } from "../../../constants/GlobalStyles";
import VehicleCard from "../../../components/vehicleCardBookingsManage";
import Vehicle from "../../classes/Vehicle";

const vehicle = new Vehicle(
  1,
  "Honda",
  "Civic EK",
  "2005",
  "1.6 cc",
  5,
  "Manual",
  "No",
  "Yes",
  "No",
  "Islamabad,Punjab",
  3500,
  2500,
  4.9,
  ["uploads\\1716922268707.jpeg"]
);
const manageBookings = () => {
  let post = {
    title: "Sample",
    rent: 3500,
    rating: 3,
    comments: 30,
    location: "Punjab, Islamabad",
    vehicle: vehicle
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <VehicleCard post={post} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(2)
  }
});
export default manageBookings;
