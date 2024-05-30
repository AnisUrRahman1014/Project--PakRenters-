import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import ReputationBar from "./reputationBar";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { ipAddress } from "../constants/misc";
export default function RenterSummaryCard({
  user,
  showCallBtn = false,
  showMessageBtn = false,
  dualBtn = false
}) {
  const navigation = useNavigation();
  const [memberSinceYear, setMemberSinceYear] = useState(null);
  useEffect(
    () => {
      if (user.memberSince) {
        const year = new Date(user.memberSince).getFullYear();
        setMemberSinceYear(year);
      }
    },
    [user.memberSince]
  );
  const handleViewProfileOnPress = () => {
    navigation.navigate("screens/userPovProfile", { user: user });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageSection}>
        <Image
          style={styles.imageContainer}
          source={{ uri: `http://${ipAddress}:8000/${user.profilePic}` }}
        />
      </View>
      <View style={[styles.contentSection(dualBtn), { marginLeft: wp(2) }]}>
        <View style={dualBtn ? styles.contentContainer : {}}>
          <Text style={styles.userName}>
            {user.username}
          </Text>
          <ReputationBar />
          <Text style={styles.secondaryLabel}>
            Member since {memberSinceYear}
          </Text>
          <TouchableOpacity onPress={handleViewProfileOnPress}>
            <Text
              style={[
                styles.secondaryLabel,
                {
                  textDecorationLine: "underline",
                  textDecorationColor: Color.grey
                }
              ]}
            >
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showMessageBtn &&
        <View style={styles.btnSection(dualBtn)}>
          <TouchableOpacity style={styles.btnContainer}>
            <MaterialIcon name="message" size={30} color={Color.dark} />
          </TouchableOpacity>
        </View>}
      {showCallBtn &&
        <View style={styles.btnSection(dualBtn)}>
          <TouchableOpacity style={styles.btnContainer}>
            <MaterialIcon name="call" size={30} color={Color.dark} />
          </TouchableOpacity>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    width: "100%",
    height: sizeManager(12),
    flexDirection: "row",
    paddingVertical: wp(2),
    alignItems: "center"
  },
  contentSection: dualBtn => ({
    flex: 1,
    justifyContent: "center",
    alignItems: dualBtn ? "center" : "flex-start"
  }),
  contentContainer: {
    alignItems: "flex-start",
    padding: sizeManager(0.01)
  },
  imageSection: {
    flex: 0.3
  },
  btnSection: dualBtn => ({
    flex: dualBtn ? 0.3 : 0.6,
    height: "100%"
  }),
  btnContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: sizeManager(0.01)
  },
  imageContainer: {
    width: wp(20),
    height: wp(20),
    resizeMode: "cover",
    backgroundColor: Color.dark
  },
  userName: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(5),
    color: Color.grey
  },
  secondaryLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4),
    color: Color.grey
  }
});
