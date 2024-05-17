import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import {
  Color,
  FontFamily,
  globalStyles,
  sizeManager
} from "../../../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LargeBtn } from "../../../components/misc";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileHomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginPage = () => {
    router.push("../../../screens/loginV2");
  };

  const profileOptions = [
    "Personal",
    "Manage Ads",
    "Manage Bookings",
    "Manage Vehicles Status"
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                btnColor={Color.focus}
              />
            </View>
          : <View style={styles.mainContainer}>
              <View style={styles.section}>
                <TouchableOpacity style={styles.dpContainer} />
                <Text style={styles.headerText}>Anis Urrahman</Text>
              </View>

              <View style={[styles.section, { alignItems: "flex-start" }]}>
                <FlatList
                  data={profileOptions}
                  renderItem={({ item }) =>
                    <TouchableOpacity style={globalStyles.verticalFlatListBtn}>
                      <Text style={globalStyles.flatListButtonLabelStyle}>
                        {item}
                      </Text>
                      <Icon
                        name="arrow-circle-right"
                        size={30}
                        color={Color.dark}
                      />
                    </TouchableOpacity>}
                />
              </View>
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
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(2)
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
    fontSize: sizeManager(3),
    marginVertical: 30,
    paddingBottom: 40,
    textAlign: "center"
  },
  headerText: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: sizeManager(3)
  }
});

export default ProfileHomeScreen;
