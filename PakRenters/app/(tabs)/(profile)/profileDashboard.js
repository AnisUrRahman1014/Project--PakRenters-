import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import {
  Color,
  FontFamily,
  globalStyles,
  sizeManager
} from "../../../constants/GlobalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LargeBtn } from "../../../components/misc";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios";
import { Buffer } from "buffer";
import User from "../../classes/User";
import { ipAddress } from "../../../constants/misc";

// Polyfill for atob
if (typeof global.atob === "undefined") {
  global.atob = base64 => Buffer.from(base64, "base64").toString("binary");
}
const ProfileHomeScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Polyfill atob for Node.js
    if (typeof atob === "undefined") {
      global.atob = function(b64) {
        return Buffer.from(b64, "base64").toString("binary");
      };
    }
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setIsLoggedIn(true);
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(
    () => {
      if (userId) {
        fetchUserProfile();
      }
    },
    [userId]
  );

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://${ipAddress}:8000/profile/${userId}`);
      const userData = res.data.user;
      const user = new User(
        userData.username,
        userData.email,
        userData.password,
        userData.phoneNumber
      );
      user.setProfilePic(`http://${ipAddress}:8000/${userData.profilePic}`);
      user.setProvince(userData.province);
      user.setCNIC(userData.cnic);
      user.setCity(userData.city);
      user.updateReputation(userData.reputation);
      user.postCount = userData.posts.length;
      console.log(userData);
      setUser(user);
    } catch (err) {
      console.log("Error processing user profile", error);
    }
  };

  const openLoginPage = () => {
    router.push("./loginV2");
  };

  const openManagePersonalScreen = () => {
    navigation.navigate("managePersonalInfo", { user: user });
  };

  const openManageAdsScreen = () => {
    navigation.navigate("manageAds", { user: user });
  };

  const openManageBookingsScreen = () => {
    navigation.navigate("manageBookings", { user: user });
  };

  const openManageVehicleStatusScreen = () => {
    navigation.navigate("manageVehicleStatus", { user: user });
  };

  const handleLogout = async () => {
    try {
      if (isLoggedIn) {
        await AsyncStorage.removeItem("authToken");
        Alert.alert(
          "Logout Successful",
          "You have been logged out successfully"
        );
        setIsLoggedIn(false);
        router.replace("./loginV2");
      }
    } catch (error) {
      console.log("Logout failed", error);
      Alert.alert("Logout failed", "An error occurred during logout");
    }
  };

  const profileOptions = [
    { label: "Personal", function: openManagePersonalScreen },
    { label: "Manage Posts", function: openManageAdsScreen },
    { label: "Manage Bookings", function: openManageBookingsScreen },
    {
      label: "Manage Vehicles Status",
      function: openManageVehicleStatusScreen
    }
  ];

  // console.log(user.getProfilePic());
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
                <View style={styles.dpContainer}>
                  {user && user.getProfilePic()
                    ? <Image
                        source={{ uri: user.getProfilePic() }}
                        style={styles.image}
                      />
                    : <Image
                        source={require("../../../assets/images/userDemoPic.png")}
                        style={styles.image}
                      />}
                </View>
                <Text style={styles.headerText}>
                  {user ? user.getUsername() : "Loading..."}
                </Text>
              </View>

              <View style={[styles.section, { alignItems: "flex-start" }]}>
                <FlatList
                  data={profileOptions}
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      style={globalStyles.verticalFlatListBtn}
                      onPress={() => {
                        item.function();
                      }}
                    >
                      <Text style={globalStyles.flatListButtonLabelStyle}>
                        {item.label}
                      </Text>
                      <Icon
                        name="arrow-circle-right"
                        size={30}
                        color={Color.dark}
                      />
                    </TouchableOpacity>}
                  ListFooterComponent={() =>
                    <TouchableOpacity
                      style={[
                        globalStyles.verticalFlatListBtn,
                        { backgroundColor: Color.dark }
                      ]}
                      onPress={() => {
                        handleLogout();
                      }}
                    >
                      <Text
                        style={globalStyles.flatListButtonLabelStyle(
                          Color.white
                        )}
                      >
                        Logout
                      </Text>
                      <Icon name="times-circle" size={30} color={Color.white} />
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
    borderRadius: wp(100),
    elevation: 10
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    borderRadius: sizeManager(100)
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
