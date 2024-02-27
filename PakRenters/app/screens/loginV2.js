import { useState, React } from "react";
import { Stack, router } from "expo-router";
import { View, Text, Image, SafeAreaView } from "react-native";
import loginMessages from "../../constants/loginMessages";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

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
            resizeMode: "contain",
            position: "relative",
            flex: 1
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
            <View
              style={{
                width: "98%",
                height: "2%",
                backgroundColor: Color.dark
              }}
            />
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
            <View
              style={{
                width: "98%",
                height: "2%",
                backgroundColor: Color.dark
              }}
            />
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
          <TouchableOpacity>
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
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    backgroundColor: Color.white
  },
  componentsContainer: {
    position: "relative",
    width: "90%",
    height: "70%",
    borderRadius: wp(3),
    alignItems: "start",
    paddingVertical: "8%",
    paddingHorizontal: "4%",
    flex: 3
  },
  tagLineLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 24,
    flex: 0.3
  },
  inputFieldStyle: {
    position: "relative",
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 18,
    width: "90%",
    height: hp(5)
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputFieldContainer: {
    paddingVertical: 8
  },
  forgetPassContainer: {
    position: "relative",
    width: "98%",
    justifyContent: "center",
    alignItems: "space-between"
  },
  forgetPassLabel: {
    fontFamily: FontFamily.ubuntuLight,
    color: Color.dark
  },
  loginBtnContainer: {
    position: "relative",
    width: "98%",
    height: hp(25),
    justifyContent: "top",
    alignItems: "center",
    paddingVertical: 16
  },
  loginBtn: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(50),
    height: "50%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  loginLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.white
  },
  signUpContainer: {
    paddingVertical: 8
  },
  signUpLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.dark
  }
};

export default LoginV2;
