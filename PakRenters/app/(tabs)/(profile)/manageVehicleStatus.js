import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React from "react";
import VehicleStatusCard from "../../../components/vehicleStatusCard";
import { Color, sizeManager } from "../../../constants/GlobalStyles";
import Vehicle from "../../classes/Vehicle";

const manageVehicleStatus = () => {
  // Dummy Data
  const vehicles = [
    new Vehicle(
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
      250,
      4.9,
      [require("../../../assets/images/civic003.jpg")]
    ),
    new Vehicle(
      2,
      "Toyota",
      "Prado",
      "2012",
      "2.0 cc",
      7,
      "Auto",
      "Yes",
      "Yes",
      "Yes",
      "Gujrat, Punjab",
      "5000",
      "43",
      "1.0",
      [require("../../../assets/images/toyota-prado-1.jpg")]
    ),
    new Vehicle( // Assuming '1' as an ID for this example // vehicleName // location // rent // comments // rating // image
      3,
      "Honda",
      " Civic EK",
      "2005",
      "1.6 cc",
      5,
      "Manual",
      "No",
      "Yes",
      "No",
      "Islamabad,Punjab",
      3500,
      250,
      4.9,
      [require("../../../assets/images/civic003.jpg")]
    )
  ]; // Assuming '1' as an ID for this example // vehicleName // location // rent // comments // rating // image
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <VehicleStatusCard vehicle={item} />}
          contentContainerStyle={{
            gap: 10,
            padding: sizeManager(1)
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  }
});

export default manageVehicleStatus;
