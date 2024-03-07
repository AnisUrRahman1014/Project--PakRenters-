import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color } from "../constants/GlobalStyles";
const ReputationBar = () => {
  return (
    <View style={styles.barContainer}>
      <View style={styles.reputation(70)} />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    position: "relative",
    width: wp(40),
    height: wp(1.5),
    borderRadius: wp(100),
    backgroundColor: Color.lightGrey,
    marginVertical: wp(1)
  },
  reputation: reputation => ({
    position: "relative",
    height: "100%",
    backgroundColor: Color.dark,
    width: `${reputation}%`
  })
});

export default ReputationBar;
