import { React, useState } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import { Stack, router } from "expo-router";
import { LargeBtn, CustomFormInputField } from "../../../components/misc";
import { ScrollView } from "react-native-gesture-handler";

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
          headerTitle: "Step 1 / 3",
          headerShadowVisible: false,
          headerTransparent: false,
          headerTitleAlign: "center",
          headerTintColor: Color.dark
        }}
      />

      <ScrollView style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/PakRenters-v4.png")}
            style={{
              width: wp(50),
              height: hp(25),
              resizeMode: "contain",
              position: "relative"
            }}
          />
        </View>
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine}>Sign up to continue</Text>
        </View>

        <View style={styles.componentContainer}>
          {/* Enter username */}
          <CustomFormInputField
            iconName={"user"}
            placeHolder={"Username"}
            value={username}
            onChange={setUsername}
          />
          {/* Enter Email */}
          <CustomFormInputField
            iconName={"envelope"}
            placeHolder={"Email address"}
            value={email}
            onChange={setEmail}
          />

          {/* Enter password */}
          <CustomFormInputField
            iconName={"lock"}
            placeHolder={"Password"}
            value={password}
            onChange={setPassword}
            secureEntry={true}
          />
          {/* Confirm Password */}
          <CustomFormInputField
            iconName={"lock"}
            placeHolder={"Re-type Password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            secureEntry={true}
          />

          {/* Enter Contact Number */}
          <CustomFormInputField
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    padding: wp(2),
    backgroundColor: Color.white
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
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
    alignItems: "center",
    marginVertical: wp(2)
  },
  signUpBtnContainer: {
    flex: 1.5,
    justifyContent: "flex-end",
    alignItems: "center"
  }
};

export default SignUpV2;
