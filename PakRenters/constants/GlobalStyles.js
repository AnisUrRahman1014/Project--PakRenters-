import { Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

/* fonts */
export const FontFamily = {
  interBold: "Inter-Bold",
  breeSerifRegular: "BreeSerif-Regular",
  ubuntuRegular: "Ubuntu-Regular",
  ubuntuBold: "Ubuntu-Bold",
  ubuntuLight: "Ubuntu-Light",
  ubuntuMedium: "Ubuntu-Medium"
};
/* Colors */
export const Color = {
  white: "#ffffff",
  dark: "#08415c",
  medium: "#6db1bf",
  focus: "#ff9f1c",
  grey: "#878787",
  lightGrey: "#d3d3d3"
};

export const StatusColors = {
  available: "#00c04b",
  unavailable: "#ff4122"
};

export const globalStyles = {
  horizontalFlatListBtn: {
    borderColor: Color.dark,
    borderWidth: hp(0.2),
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(3),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(20)
  },
  verticalFlatListBtn: {
    width: wp(95),
    height: hp(5),
    borderWidth: wp(0.3),
    marginVertical: hp(0.5),
    paddingHorizontal: wp(1),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  flatListButtonLabelStyle: labelColor => ({
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: labelColor ? labelColor : "black"
  })
};

export const sizeManager = size => {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  if (width > height) {
    return wp(size);
  } else {
    return hp(size);
  }
};
