import { useState, React } from "react";
import { Stack, router } from "expo-router";
import { View, Text, Image, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Separator from "../../components/separator";
import { LargeBtn, SignUpTextInputField } from "../../components/misc";

const LoginV2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameFieldHandler = inputText => {
    // Update the state for the username
    const removedSpaces = inputText.replace(/\s/g, "");
    setUsername(removedSpaces);
  };

  const passwordFieldHandler = inputText => {
    // Update the state for the password
    setPassword(inputText);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerTransparent: true
        }}
      />
      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/images/PakRenters-v4.png")}
          style={{
            width: wp(50),
            height: hp(25),
            resizeMode: "contain",
            position: "relative",
            flex: 2
          }}
        />
        <Text style={styles.tagLineLabel}>Please sign in to continue</Text>
        <View style={styles.componentsContainer}>
          {/*  Username Input Field */}
          <SignUpTextInputField
            iconName={"user"}
            placeHolder={"Username or Email address"}
            onChange={usernameFieldHandler}
            value={username}
          />
          {/* Password field */}
          <SignUpTextInputField
            iconName={"lock"}
            placeHolder={"Enter password"}
            value={password}
            onChange={setPassword}
            secureEntry={true}
          />

          {/* FORGET PASSWORD BUTTON */}
          <View style={styles.forgetPassContainer}>
            <TouchableOpacity>
              <Text style={styles.forgetPassLabel}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.loginBtnContainer}>
            <LargeBtn btnLabel={"Login"} />
          </View>
        </View>

        {/* SIGN UP LABEL */}
        <View style={styles.signUpContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push("../screens/signUpScreens/signUpScreen1");
            }}
          >
            <Text style={styles.signUpLabel}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    position: "relative",
    width: wp(100),
    height: hp(103),
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(2),
    backgroundColor: Color.white
  },
  componentsContainer: {
    position: "relative",
    width: wp(90),
    height: hp(70),
    borderRadius: wp(3),
    alignItems: "start",
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    flex: 3,
    gap: wp(4)
  },
  tagLineLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(3.5),
    flex: 0.3
  },
  inputFieldContainer: {
    paddingVertical: hp(1)
  },
  forgetPassContainer: {
    position: "relative",
    width: wp(80),
    justifyContent: "center",
    alignItems: "space-between"
  },
  forgetPassLabel: {
    fontFamily: FontFamily.ubuntuLight,
    color: Color.dark
  },
  loginBtnContainer: {
    position: "relative",
    width: wp(80),
    height: hp(25),
    justifyContent: "top",
    alignItems: "center",
    paddingVertical: hp(2)
  },
  signUpContainer: {
    paddingVertical: hp(1)
  },
  signUpLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2.1),
    color: Color.dark
  }
};

export default LoginV2;
