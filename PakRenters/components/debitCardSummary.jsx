import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";

const DebitCardSummary = ({ user }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Icon name="cc-mastercard" size={30} color={Color.dark} />
          <Icon name="cc-visa" size={30} color={"red"} />
        </View>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>**** **** **** 5379</Text>
        </View>
      </View>
    </View>
  );
};

export default DebitCardSummary;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: sizeManager(1),
    borderColor: Color.focus,
    borderWidth: sizeManager(0.1)
  },
  iconContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: sizeManager(0.2),
    borderColor: Color.dark
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1
  },
  cardNumberContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardNumber: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: 24,
    color: Color.grey
  }
});
