import { useState, React } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LargeBtn, CustomFormInputField } from "../../components/misc";
import axios from "axios";

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

  const handleLogin = () => {
    const userData = {
      username: username,
      password: password
    };
    axios
      .post("http://192.168.1.21:8000/login", userData)
      .then(res => {
        Alert.alert("Login Successful", "You have been logged in successfully");
        console.log(res.data);
      })
      .catch(error => {
        Alert.alert("Login failed", "An error occured during login");
        console.log("Login failed", error);
      });

    router.push("../(tabs)/(profile)/profileDashboard");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/PakRenters-v3.0.jpg")}
            style={{
              width: wp(50),
              height: hp(25),
              resizeMode: "contain",
              position: "relative"
            }}
          />
        </View>

        <Text style={styles.tagLineLabel}>Please sign in to continue</Text>
        <View style={styles.componentsContainer}>
          {/*  Username Input Field */}
          <CustomFormInputField
            iconName={"user"}
            placeHolder={"Username or Email address"}
            onChange={usernameFieldHandler}
            value={username}
          />
          {/* Password field */}
          <CustomFormInputField
            iconName={"lock"}
            placeHolder={"Enter password"}
            value={password}
            onChange={passwordFieldHandler}
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
            <LargeBtn btnLabel={"Login"} onPress={handleLogin} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    position: "relative",
    flex: 1,
    padding: wp(2),
    backgroundColor: Color.white
  },
  logoContainer: {
    flex: 2,
    marginVertical: wp(5),
    justifyContent: "center",
    alignItems: "center"
  },
  componentsContainer: {
    position: "relative",
    borderRadius: wp(3),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    flex: 5,
    gap: wp(4)
  },
  tagLineLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(3.5),
    flex: 0.5,
    textAlign: "center"
  },
  inputFieldContainer: {
    paddingVertical: hp(1)
  },
  forgetPassContainer: {
    flex: 0.5,
    position: "relative",
    width: wp(80),
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: wp(2)
  },
  forgetPassLabel: {
    fontFamily: FontFamily.ubuntuLight,
    color: Color.dark
  },
  loginBtnContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  signUpContainer: {
    flex: 0.5,
    marginVertical: wp(2),
    paddingVertical: hp(1),
    justifyContent: "center",
    alignItems: "center"
  },
  signUpLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2.1),
    color: Color.dark
  }
};

export default LoginV2;
