import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import BookingReport from "../app/classes/BookingReport";
import { ipAddress } from "../constants/misc";

const BookingCustomerCard = ({ post, booking }) => {
  const { vehicle, user } = post;
  const { customer } = booking;
  const navigation = useNavigation();
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  let report = new BookingReport(
    user._id,
    customer._id,
    post,
    formatDate(booking.startDate),
    formatDate(booking.endDate),
    booking.days,
    booking.rentPerDay
  );
  const handleOnPress = () => {
    navigation.navigate("screens/(bookingScreens)/bookingReport", {
      renter: user,
      customerId: customer._id,
      report: report,
      accessType: "restricted",
      customer: customer
    });
  };
  if (!booking) {
    return <Text>Loading</Text>;
  }

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handleOnPress}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: `http://${ipAddress}:8000/${customer.profilePic}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentSubContainer}>
          <Text style={styles.username}>
            {customer.username}
          </Text>
        </View>
        <View style={styles.contentSubContainer}>
          <Text style={styles.bookingDetails}>
            From: {booking.startDate}
          </Text>
          <Text style={styles.bookingDetails}>
            To: {booking.endDate}
          </Text>
          <Text style={styles.bookingDetails}>
            Days: {booking.days}
          </Text>
          <Text style={styles.bookingDetails}>
            Total Bill: {booking.totalRent} Rs.
          </Text>
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
