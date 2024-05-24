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
  [require("../../../assets/images/civic003.jpg")]
);
const manageBookings = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <VehicleCard vehicle={vehicle} />
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
