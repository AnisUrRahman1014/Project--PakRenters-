import { React } from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color } from "../constants/GlobalStyles";

const Separator = ({ width, height }) => {
  return (
    <View
      style={{
        width: wp(width),
        height: hp(height),
        backgroundColor: Color.dark
      }}
    />
  );
};

export default Separator;
