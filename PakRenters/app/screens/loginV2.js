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
            position: "relative"
          }}
        />
        <Text style={styles.tagLineLabel}>Please sign in to continue</Text>
        <View style={styles.componentsContainer}>
          <Text>Hello World</Text>
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
    backgroundColor: Color.dark,
    alignItems: "center",
    paddingVertical: "8%",
    paddingHorizontal: "4%"
  },
  tagLineLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 24,
    marginBottom: hp(2)
  }
};

export default LoginV2;
