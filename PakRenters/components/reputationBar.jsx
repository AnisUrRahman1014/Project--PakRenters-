import React from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Color } from "../constants/GlobalStyles";

const ReputationBar = ({ reputation }) => {
  // Ensure the reputation is clamped between 0 and 100
  const clampedReputation = Math.max(0, Math.min(100, reputation));

  return (
    <View style={styles.barContainer}>
      <View style={[styles.reputation, { width: `${clampedReputation}%` }]} />
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
  reputation: {
    position: "relative",
    height: "100%",
    backgroundColor: Color.dark
  }
});

export default ReputationBar;
