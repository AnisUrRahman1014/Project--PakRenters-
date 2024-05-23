import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color, sizeManager } from "../constants/GlobalStyles";

const DotIndicator = ({ currentIndex, totalImages }) => {
  return (
    <View style={styles.dotContainer}>
      {Array.from({ length: totalImages }).map((_, index) =>
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index ? styles.activeDot : styles.inactiveDot
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: sizeManager(0.1)
  },
  dot: {
    width: sizeManager(1),
    height: sizeManager(1),
    borderRadius: sizeManager(0.5),
    backgroundColor: Color.grey,
    marginHorizontal: sizeManager(0.5)
  },
  activeDot: {
    backgroundColor: Color.dark
  }
});

export default DotIndicator;
