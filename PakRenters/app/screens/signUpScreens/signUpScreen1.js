import { React, useState } from "react";
import { View, Text, Image, SafeAreaView, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import { Stack, router } from "expo-router";
import { LargeBtn, CustomFormInputField } from "../../../components/misc";
import { ScrollView } from "react-native-gesture-handler";
import User from "../../classes/User";

const SignUpV2 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  let user;

  const handleUsername = text => {
    const textWithoutSpaces = text.replace(/\s/g, "");
    setUsername(textWithoutSpaces);
  };
  const validateFields = () => {
    if (
      (username || email || password || confirmPassword || contactNumber) === ""
    ) {
      Alert.alert("Cannot proceed", "Please fill all fields");
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please make sure you entered the same password"
      );
      return false;
    } else if (email.includes("@") == false) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    } else if (contactNumber.length != 11) {
      Alert.alert(
        "Invalid Phone Number",
        "Please make sure the phone number is correct"
      );
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateFields()) {
      return null;
    }
    user = new User(username, email, password, contactNumber);
    router.push("../../screens/signUpScreens/signUpScreen2");
    router.setParams({ newUser: user });
  };
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
            source={require("../../../assets/images/PakRenters-v3.0.jpg")}
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
            onChange={handleUsername}
            textType={"username"}
          />
          {/* Enter Email */}
          <CustomFormInputField
            iconName={"envelope"}
            placeHolder={"Email address"}
            value={email}
            onChange={setEmail}
            textType={"emailAddress"}
          />

          {/* Enter password */}
          <CustomFormInputField
            iconName={"lock"}
            placeHolder={"Password"}
            value={password}
            onChange={setPassword}
            secureEntry={true}
            textType={"password"}
          />
          {/* Confirm Password */}
          <CustomFormInputField
            iconName={"lock"}
            placeHolder={"Re-type Password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            secureEntry={true}
            textType={"password"}
          />

          {/* Enter Contact Number */}
          <CustomFormInputField
            iconName={"phone"}
            placeHolder={"Phone Number"}
            value={contactNumber}
            onChange={setContactNumber}
            textType={"telephoneNumber"}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.signUpBtnContainer}>
          <LargeBtn
            btnLabel={"Continue"}
            onPress={() => {
              handleContinue();
            }}
            btnColor={Color.focus}
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
