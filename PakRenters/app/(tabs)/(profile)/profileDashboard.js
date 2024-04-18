import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LargeBtn } from "../../../components/misc";

const ProfileHomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginPage = () => {
    router.push("../../../screens/loginV2");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTintColor: Color.dark,
          headerTitle: "Profile",
          headerShadowVisible: false
        }}
      />
      <View style={styles.mainContainer}>
        {!isLoggedIn
          ? <View style={styles.noLoginScreen}>
              <Image
                source={require("../../../assets/images/PakRenters-v3.0.jpg")}
                style={styles.demoPic}
              />
              <Text style={styles.noLoginSloggen}>
                Break the chains and join the ultimate renting platform
              </Text>
              <LargeBtn
                btnLabel={"Login to continue"}
                onPress={openLoginPage}
              />
            </View>
          : <View style={styles.section}>
              <TouchableOpacity style={styles.dpContainer} />
            </View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  section: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: wp(0.2),
    borderColor: Color.dark
  },
  dpContainer: {
    width: "40%",
    aspectRatio: 1 / 1,
    backgroundColor: Color.lightGrey,
    borderRadius: wp(100)
  },
  demoPic: {
    position: "relative",
    width: "80%",
    height: "50%",
    resizeMode: "cover",
    marginVertical: 15
  },
  noLoginScreen: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15
  },
  noLoginSloggen: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    marginVertical: 30,
    paddingBottom: 40,
    textAlign: "center"
  }
});

export default ProfileHomeScreen;
