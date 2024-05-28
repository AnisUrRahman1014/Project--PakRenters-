import { React, useState } from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color } from "../constants/GlobalStyles";
import { router } from "expo-router";

const CategoryBtn = ({ iconName }) => {
  const openCategory = () => {
    router.push("./screens/listingScreen");
    router.setParams({ categoryName: iconName });
  };
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        openCategory();
      }}
    >
      <MaterialCommunityIcons name={iconName} size={60} color={Color.dark} />
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    width: "30%",
    borderColor: Color.dark,
    borderWidth: hp(0.2),
    borderRadius: hp(1),
    justifyContent: "top",
    alignItems: "center",
    padding: wp(3),
    margin: wp(1)
  }
};

export default CategoryBtn;
