import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import BookingReport from "../app/classes/BookingReport";

const BookingCustomerCard = ({ post }) => {
  const { vehicle, user } = post;
  const navigation = useNavigation();
  const startDate = "27-05-2024";
  const endDate = "05-06-2024";
  const totalDays = "10";
  let report = new BookingReport(vehicle, startDate, endDate, totalDays, 3000);
  const handleOnPress = () => {
    navigation.navigate("screens/(bookingScreens)/bookingReport", {
      user: user,
      report: report,
      accessType: "restricted"
    });
  };
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handleOnPress}>
      <View style={styles.leftContainer}>
        <Image
          source={require("../assets/images/Anis.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentSubContainer}>
          <Text style={styles.username}>i_a_n_33_s</Text>
        </View>
        <View style={styles.contentSubContainer}>
          <Text style={styles.bookingDetails}>
            From: {startDate}
          </Text>
          <Text style={styles.bookingDetails}>
            To: {endDate}
          </Text>
          <Text style={styles.bookingDetails}>
            Date: {totalDays}
          </Text>
          <Text style={styles.bookingDetails}>Total Bill: 31000</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Icon name="chevron-right" size={30} color={Color.dark} />
      </View>
    </TouchableOpacity>
  );
};

export default BookingCustomerCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: sizeManager(1),
    flexDirection: "row",
    borderBottomWidth: sizeManager(0.1),
    marginBottom: sizeManager(2)
  },
  leftContainer: {
    flex: 0.3,
    aspectRatio: 1,
    padding: sizeManager(1),
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1
  },
  btnContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: sizeManager(100)
  },
  contentSubContainer: {
    padding: sizeManager(1)
  },
  username: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: 16,
    color: Color.dark
  },
  bookingDetails: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.dark
  }
});
