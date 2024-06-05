import { useFonts } from "expo-font";
import { React, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import { FilterTypes } from "../constants/ListingFilterTypes";
("../constants/ListingFilterTypes");

const SearchBar = () => {
  const [searchFor, setSearchFor] = useState("");
  const navigation = useNavigation();
  const handleOnSearch = async () => {
    navigation.navigate("screens/listingScreen", {
      filterType: FilterTypes.search,
      filter: searchFor,
      categoryName: "All"
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholderTextColor={Color.white}
        placeholder="Search here"
        value={searchFor}
        onChangeText={text => setSearchFor(text)}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={handleOnSearch}>
        <Icon name="search" size={20} color={Color.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(7),
    marginHorizontal: wp(2.5),
    marginVertical: hp(1.5),
    height: hp(7),
    borderRadius: wp(100),
    backgroundColor: Color.dark
  },
  inputField: {
    position: "relative",
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    flexWrap: "wrap",
    color: Color.white,
    width: wp(65)
  },
  searchBtn: {
    position: "relative",
    width: wp(10),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center"
  }
};

export default SearchBar;
