import { React, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color } from "../constants/GlobalStyles";
import { useNavigation } from "expo-router";
import { FilterTypes } from "../constants/ListingFilterTypes.js";
import { Categories } from "../constants/Categories.js";

const CategoryBtn = ({ iconName }) => {
  const navigation = useNavigation();
  const [categoryName, setCategoryName] = useState();
  useEffect(() => {
    switch (iconName) {
      case "car":
        setCategoryName(Categories.cars);
        break;
      case "motorbike":
        setCategoryName(Categories.bikes);
        break;
      case "bus":
        setCategoryName(Categories.buses);
        break;
      case "truck-flatbed":
        setCategoryName(Categories.loaders);
        break;
      case "truck":
        setCategoryName(Categories.trucks);
        break;
      case "excavator":
        setCategoryName(Categories.construction);
        break;
    }
  }, []);
  const openCategory = () => {
    console.log(categoryName);
    navigation.navigate("screens/listingScreen", {
      categoryName: categoryName,
      filterType: FilterTypes.category
    });
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
