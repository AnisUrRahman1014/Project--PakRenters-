import {View, Text, Image, TouchableOpacity, Animated} from 'react-native'
import React, {useState} from "react";
import {FontFamily,Color} from "../constants/GlobalStyles";
import { BounceIn, FadeIn, FadeInDown, FadeInLeft, FadeOut } from "react-native-reanimated";
import messages from "../constants/splashMessages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
const Splash = () => {
  const [fontsLoaded, error] = useFonts({
    "BreeSerif-Regular": require("../assets/fonts/BreeSerif-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });



  if (!fontsLoaded && !error) {
    return null;
  }

  return <View style={styles.mainContainer}>
      <Animated.Image entering={FadeInDown.delay(500)} style={styles.logoContainer} source={require("../assets/images/PakRenters-v3.0.jpg")} />

      <Animated.Text entering={FadeInLeft.delay(5000)} style={styles.tagLine}>
        {messages.tagLine}
      </Animated.Text>
      <TouchableOpacity style={styles.letsGoBtn} onPress={()=>{router.push("./screens/login")}} >
        <Text style={styles.letsGoText}>
          {messages.letsGo}
        </Text>
      </TouchableOpacity>
      <View style={styles.androidSmall1Child} />
    </View>;
};
const styles = {
  mainContainer: {
    width: wp(100),
    height: hp(100),
    alignItems: "center",
    backgroundColor: Color.white
  },
  logoContainer: {
    flex: 3,
    position: "relative",
    width: wp(80),
    height: hp(80),
    resizeMode: "contain"
  },
  tagLine: {
    flex: 2,
    position: "relative",
    top: hp(-4),
    fontFamily: FontFamily.breeSerifRegular,
    color: Color.dark,
    fontSize: hp(10),
    lineHeight: hp(10)
  },
  letsGoBtn: {
    flex: 0.4,
    position: "relative",
    top: hp(-5),
    width: wp(70),
    alignItems: "center",
    borderRadius: wp(8),
    backgroundColor: Color.dark,
    justifyContent: "center"
  },
  letsGoText: {
    position: "relative",
    color: Color.white,
    fontFamily: FontFamily.interBold
  }
};

export default Splash;
