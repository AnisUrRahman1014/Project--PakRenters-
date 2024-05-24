import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import FavouritizedPostCard from "../../components/favourtizedPostCard";
import Vehicle from "../classes/Vehicle";

const Favourites = () => {
  const favouritePosts = [
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
      2500,
      4.9,
      [require("../../assets/images/civic003.jpg")]
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
      [require("../../assets/images/toyota-prado-1.jpg")]
    )
  ]; // Assuming '1' as an ID for this example // vehicleName // location // rent // comments // rating // image
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={favouritePosts}
        renderItem={({ item }) => <FavouritizedPostCard vehicle={item} />}
        contentContainerStyle={styles.flatList}
        alwaysBounceVertical={true}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(1)
  },
  flatList: {
    gap: 8,
    paddingVertical: sizeManager(1)
  }
});
