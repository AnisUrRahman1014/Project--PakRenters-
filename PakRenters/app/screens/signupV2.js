import { React, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Color, FontFamily } from "../../constants/GlobalStyles";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LargeBtn, SignUpTextInputField } from "../../components/misc";

const SignUpV2 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerTransparent: true
        }}
      />

      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/images/PakRenters-v3.0.jpg")}
          style={{
            width: wp(50),
            height: hp(25),
            resizeMode: "cover",
            position: "relative",
            flex: 2
          }}
        />
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine}>Sign up to continue</Text>
        </View>

        <View style={styles.componentContainer}>
          {/* Enter first name */}
          <SignUpTextInputField
            iconName={"user"}
            placeHolder={"First Name"}
            value={firstName}
            onChange={setFirstName}
          />
          {/* Enter last name */}
          <SignUpTextInputField
            iconName={"user"}
            placeHolder={"Last Name"}
            value={lastName}
            onChange={setLastName}
          />

          {/* Enter Email */}
          <SignUpTextInputField
            iconName={"envelope"}
            placeHolder={"Email address"}
            value={email}
            onChange={setEmail}
          />

          {/* Enter username */}
          <SignUpTextInputField
            iconName={"lock"}
            placeHolder={"Username"}
            value={username}
            onChange={setUsername}
          />

          {/* Enter password */}
          <SignUpTextInputField
            iconName={"key"}
            placeHolder={"Password"}
            value={password}
            onChange={setPassword}
            secureEntry={true}
          />
          {/* Confirm Password */}
          <SignUpTextInputField
            iconName={"key"}
            placeHolder={"Re-type Password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            secureEntry={true}
          />

          {/* Enter Contact Number */}
          <SignUpTextInputField
            iconName={"phone"}
            placeHolder={"Phone Number"}
            value={contactNumber}
            onChange={setContactNumber}
          />
        </View>
        <View style={styles.signUpBtnContainer}>
          <LargeBtn btnLabel={"Continue"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: wp(2),
    backgroundColor: Color.white,
    maxWidth: "100%"
  },
  tagLineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tagLine: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(4),
    color: Color.dark
  },
  componentContainer: {
    flex: 7,
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
    gap: hp(3)
  },
  signUpBtnContainer: {
    flex: 1.5
  }
};

export default SignUpV2;
