import { React, useState } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LargeBtn, SignUpTextInputField } from "../../../components/misc";

const SignUpV2 = () => {
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
          source={require("../../../assets/images/PakRenters-v4.png")}
          style={{
            width: wp(50),
            height: hp(25),
            resizeMode: "contain",
            position: "relative",
            flex: 2
          }}
        />
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine}>Sign up to continue</Text>
        </View>

        <View style={styles.componentContainer}>
          {/* Enter username */}
          <SignUpTextInputField
            iconName={"user"}
            placeHolder={"Username"}
            value={username}
            onChange={setUsername}
          />
          {/* Enter Email */}
          <SignUpTextInputField
            iconName={"envelope"}
            placeHolder={"Email address"}
            value={email}
            onChange={setEmail}
          />

          {/* Enter password */}
          <SignUpTextInputField
            iconName={"lock"}
            placeHolder={"Password"}
            value={password}
            onChange={setPassword}
            secureEntry={true}
          />
          {/* Confirm Password */}
          <SignUpTextInputField
            iconName={"lock"}
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
          <LargeBtn
            btnLabel={"Continue"}
            onPress={() => {
              router.push("../../screens/signUpScreens/signUpScreen2");
            }}
          />
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  tagLine: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(4),
    color: Color.dark
  },
  componentContainer: {
    flex: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
    gap: hp(3),
    alignItems: "center"
  },
  signUpBtnContainer: {
    flex: 1.5
  }
};

export default SignUpV2;
