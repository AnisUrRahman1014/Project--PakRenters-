import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import ReputationBar from "./reputationBar";
export default function RenterSummaryCard({ User }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.section}>
        <Image
          style={styles.imageContainer}
          source={require("../assets/images/Anis.jpg")}
        />
      </View>
      <View style={[styles.section, { marginLeft: wp(2) }]}>
        <Text style={styles.userName}>Anis Urrahman</Text>
        <ReputationBar />
        <Text style={styles.secondaryLabel}>Member since 2024</Text>
        <TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    paddingVertical: wp(2)
  },
  section: {
    justifyContent: "flex-start",
    alignContent: "center"
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
