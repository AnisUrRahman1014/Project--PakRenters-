import { React } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, FontFamily } from "../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Separator from "../components/separator";
export const SignUpTextInputField = ({
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
          <Icon name={iconName} size={20} color={Color.dark} />
        </View>
        <TextInput
          style={styles.field}
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
      <Separator width={70} height={0.2} />
    </View>
  );
};

export const LargeBtn = ({ onPress, btnLabel, btnColor }) => {
  return (
    <TouchableOpacity style={styles.largeBtn}>
      <Text
        style={[styles.largeLabel, { backgroundColor: { btnColor } }]}
        onPress={onPress}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
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
    flexDirection: "column"
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
  }
};
