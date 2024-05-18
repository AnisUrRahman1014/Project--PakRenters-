import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Color, sizeManager } from "../constants/GlobalStyles";
import { NotificationTypes } from "../constants/NotificationTypes";

const Notification = ({ type, content }) => {
  const [isFocused, setIsFocused] = useState(true);

  const handlePress = () => {
    setIsFocused(false);
  };

  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        !isFocused && { backgroundColor: Color.white }
      ]}
      onPress={handlePress}
    >
      {/* Image / Icon container */}
      <View style={styles.leftContainer} />
      <View style={styles.rightContainer} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    padding: sizeManager(0.4),
    borderTopWidth: sizeManager(0.08),
    borderBottomWidth: sizeManager(0.08),
    borderColor: Color.dark,
    backgroundColor: Color.lightGrey,
    gap: 5
  },
  leftContainer: {
    flex: 0.2,
    aspectRatio: 1,
    backgroundColor: Color.grey,
    borderRadius: sizeManager(1)
  },
  rightContainer: {
    flex: 1,
    backgroundColor: Color.dark
  }
});

export default Notification;
