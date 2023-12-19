import React, {useState} from 'react';
import {useFonts} from 'expo-font';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const SignUp =()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const [fontsLoaded, error] = useFonts({
      "Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
      "Ubuntu-Regular": require("../../assets/fonts/Ubuntu-Regular.ttf")
    });

    if (!fontsLoaded && !error) {
      return null;
    }

    return <View style={styles.mainContainer}>
        <View style={styles.shapeContainer}>
          <View style={styles.curve2}>
            <View style={styles.curve1}>
              <View style={styles.ovalShape}>
                <Text style={styles.title}>
                  Please provide the following information
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameFieldsContainer}>
            <View style={styles.fieldContainerSmall}>
              <TextInput style={styles.nameFieldStyles} placeholder="First Name" value={firstName} placeholderTextColor={Color.grey} onChange={text => setFirstName(text)} />
            </View>
            <View style={styles.fieldContainerSmall}>
              <TextInput style={styles.nameFieldStyles} placeholder="Last Name" value={lastName} placeholderTextColor={Color.grey} onChange={text => setLastName(text)} />
            </View>
          </View>

          <View style={styles.fieldContainerLarge}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={20} color={Color.white} />
            </View>
            <TextInput style={styles.fieldStyles} placeholder="Enter a username" value={username} onChange={text => setUsername(text)} placeholderTextColor={Color.grey} />
          </View>

          <View style={styles.fieldContainerLarge}>
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={17} color={Color.white} />
            </View>
            <TextInput style={styles.fieldStyles} placeholder="Enter your email address" value={email} onChange={text => setEmail(text)} placeholderTextColor={Color.grey} />
          </View>

          <View style={styles.fieldContainerLarge}>
            <View style={styles.iconContainer}>
              <Icon name="phone" size={17} color={Color.white} />
            </View>
            <TextInput style={styles.fieldStyles} placeholder="Enter your mobile number" value={contactNumber} onChange={text => setContactNumber(text)} placeholderTextColor={Color.grey} />
          </View>

          <View style={styles.fieldContainerLarge}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={17} color={Color.white} />
            </View>
            <TextInput style={styles.fieldStyles} placeholder="Enter a Password" value={password} onChange={text => setPassword(text)} placeholderTextColor={Color.grey} />
          </View>

          <View style={styles.fieldContainerLarge}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={17} color={Color.white} />
            </View>
            <TextInput style={styles.fieldStyles} placeholder="Confirm Password" value={confirmPassword} onChange={text => setConfirmPassword(text)} placeholderTextColor={Color.grey} />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>;
}

const styles = {
  mainContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    alignItems: "center"
  },
  shapeContainer: {
    flex: 1,
    width: wp(200),
    height: hp(100),
    alignItems: "center"
  },
  ovalShape: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.dark,
    width: wp(110),
    height: hp(55),
    alignItems: "center"
  },
  curve1: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.medium,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: "hidden"
  },
  curve2: {
    position: "relative",
    top: hp(-15),
    borderRadius: wp(100),
    backgroundColor: Color.focus,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: "hidden"
  },
  title: {
    position: "relative",
    textAlign: "center",
    top: hp(38),
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 24,
    width: wp(100)
  },
  infoContainer: {
    flex: 1.4,
    position: "relative",
    width: wp(80),
    height: hp(50),
    margin: hp(2)
  },
  nameFieldsContainer: {
    position: "relative",
    height: hp(5),
    width: wp(80),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fieldContainerSmall: {
    position: "relative",
    height: hp(5),
    width: wp(38),
    backgroundColor: Color.dark,
    borderRadius: wp(100),
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: wp(5)
  },
  fieldContainerLarge: {
    position: "relative",
    height: hp(5),
    width: wp(80),
    backgroundColor: Color.dark,
    borderRadius: wp(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: hp(1),
    paddingHorizontal: wp(5)
  },
  nameFieldStyles: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14
  },
  fieldStyles: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14,
    width: wp(60)
  },
  btnContainer: {
    position: "relative",
    height: hp(10),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  button: {
    position: "relative",
    backgroundColor: Color.focus,
    borderRadius: wp(100),
    width: wp(37),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14
  },
  iconContainer: {
    width: wp(7),
    height: hp(3),
    alignItems: "center",
    justifyContent: "center"
  }
};

export default SignUp;
