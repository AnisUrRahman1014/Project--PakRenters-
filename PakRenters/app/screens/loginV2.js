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
          source={require("../../assets/images/PakRenters-v3.0.jpg")}
          style={{
            width: wp(50),
            height: hp(25),
            resizeMode: "cover",
            position: "relative",
            flex: 2
          }}
        />
        <Text style={styles.tagLineLabel}>Please sign in to continue</Text>
        <View style={styles.componentsContainer}>
          {/*  Username Input Field */}
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputField}>
              <Icon
                name="user"
                color={Color.dark}
                size={30}
                paddingRight={5}
                paddingVertical={4.7}
              />
              <TextInput
                placeholder="Enter Username or Email"
                color={Color.dark}
                style={styles.inputFieldStyle}
                value={username}
                onChangeText={usernameFieldHandler}
              />
            </View>
            {/* Separator Bar */}
            <Separator width={80} height={0.2} />
          </View>

          {/* PASSWORD INPUT FIELD */}
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputField}>
              <Icon
                name="lock"
                color={Color.dark}
                size={30}
                paddingRight={5}
                paddingVertical={4.7}
              />
              <TextInput
                placeholder="Enter Password"
                color={Color.dark}
                style={styles.inputFieldStyle}
                value={password}
                onChangeText={passwordFieldHandler}
                secureTextEntry={true}
              />
            </View>
            {/* Separator Bar */}
            <Separator width={80} height={0.2} />
          </View>

          {/* FORGET PASSWORD BUTTON */}
          <View style={styles.forgetPassContainer}>
            <TouchableOpacity>
              <Text style={styles.forgetPassLabel}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginLabel}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SIGN UP LABEL */}
        <View style={styles.signUpContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push("../screens/signupV2");
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
    flex: 3
  },
  tagLineLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(3.5),
    flex: 0.3
  },
  inputFieldStyle: {
    position: "relative",
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2.5),
    width: hp(90),
    height: hp(5)
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center"
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
  loginBtn: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(50),
    height: hp(5),
    borderRadius: hp(25),
    justifyContent: "center",
    alignItems: "center"
  },
  loginLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.white
  },
  signUpContainer: {
    paddingVertical: hp(1)
  },
  signUpLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2.5),
    color: Color.dark
  }
};

export default LoginV2;
