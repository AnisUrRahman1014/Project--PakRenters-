import { React } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color, FontFamily } from "../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Separator from "../components/separator";
export const CustomFormInputField = ({
  iconName,
  placeHolder,
  onChange,
  value,
  secureEntry = false
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name={iconName}
            size={20}
            color={Color.dark}
            width={wp(7)}
            alignItems={"center"}
            justifyContent={"center"}
          />
        </View>
        <TextInput
          placeholder={placeHolder}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={Color.grey}
          fontFamily={FontFamily.ubuntuRegular}
          fontSize={hp(2.2)}
          paddingHorizontal={wp(2)}
          width={wp(67)}
          secureTextEntry={secureEntry}
          color={Color.dark}
        />
      </View>
      {/* <Separator width={70} height={0.2} /> */}
    </View>
  );
};

export const LargeBtn = ({ onPress, btnLabel, btnColor }) => {
  return (
    <TouchableOpacity style={styles.largeBtn} onPress={onPress}>
      <Text style={[styles.largeLabel, { backgroundColor: { btnColor } }]}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const Smallbtn = ({ onPress, btnLabel, btnColor }) => {
  return (
    <TouchableOpacity style={styles.smallBtn} onPress={onPress}>
      <Text style={[styles.largeLabel, { backgroundColor: { btnColor } }]}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const SpecsDisplay = ({ specLabel, iconName }) => {
  return (
    <View style={styles.specsDisplayContainer}>
      <View style={styles.specsIconContainer}>
        <MaterialCommunityIcon name={iconName} size={30} color={Color.dark} />
      </View>
      <Text style={styles.specLabel}>
        {specLabel}
      </Text>
    </View>
  );
};

const styles = {
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: wp(70)
  },
  iconContainer: {
    width: wp(5)
  },
  mainContainer: {
    flexDirection: "column",
    borderWidth: wp(0.2),
    padding: wp(1),
    borderColor: Color.dark
  },
  largeBtn: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(50),
    height: hp(5),
    borderRadius: hp(25),
    justifyContent: "center",
    alignItems: "center"
  },
  largeLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.white
  },
  smallBtn: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(25),
    height: hp(5),
    borderRadius: hp(25),
    justifyContent: "center",
    alignItems: "center"
  },
  specsDisplayContainer: {
    flexDirection: "row",
    width: wp(30),
    height: hp(5),
    alignItems: "center",
    marginHorizontal: wp(6.2),
    marginVertical: wp(2)
  },
  specsIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(8),
    height: wp(7)
  },
  specLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(5),
    color: Color.dark,
    paddingHorizontal: wp(2)
  }
};
