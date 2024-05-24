import { View, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Color, sizeManager } from "../../../constants/GlobalStyles";
import Vehicle from "../../classes/Vehicle";
import { FlatList } from "react-native-gesture-handler";
import VehicleCard from "../../../components/vehicleCardManageAds";

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
    2, // Assuming '1' as an ID for this example
    "Toyota",
    "Prado",
    "2012", // vehicleName
    "2.0 cc",
    7,
    "Auto",
    "Yes",
    "Yes",
    "Yes",
    "Gujrat, Punjab", // location
    "5000", // rent
    "43", // comments
    "1.0", // rating
    [require("../../../assets/images/toyota-prado-1.jpg")] // image
  ),
  new Vehicle(
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
];

const manageAds = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          contentContainerStyle={{
            gap: 10,
            paddingVertical: sizeManager(1)
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(1)
  }
});

export default manageAds;
